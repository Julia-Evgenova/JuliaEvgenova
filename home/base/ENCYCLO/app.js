document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // навигация по страницам
    const routes = {
        'home': renderHomePage,
        'table-of-contents': renderTableOfContents,
        'article': renderArticlePage
    };

    function navigateTo(route, param) {
        const url = param ? `#${route}/${param}` : `#${route}`;
        history.pushState(null, null, url);
        render();
    }

    function render() {
        const [route, param] = location.hash.slice(1).split('/');
        (routes[route] || renderHomePage)(param);
    }

    // главная страница
    function renderHomePage() {
        app.innerHTML = `
            <h1>Энциклопедия</h1>
            <a href="#table-of-contents">Список статей здесь</a>
        `;
    }

    // оглавление
    async function renderTableOfContents() {
        const response = await fetch('data/articles.json');
        const data = await response.json();

        const articlesByLetter = data.articles.reduce((acc, article) => {
            const letter = article.title[0].toUpperCase(); // Первая буква заголовка
            acc[letter] = acc[letter] || [];              // Создаем раздел, если его нет
            acc[letter].push(article);                   // Добавляем статью в раздел
            return acc;
        }, {});


        app.innerHTML = '<h1>Оглавление</h1>';
        for (const letter in articlesByLetter) {
            const section = document.createElement('div');
            section.innerHTML = `<h2>${letter}</h2>`;
            articlesByLetter[letter].forEach(article => {
                const link = document.createElement('a');
                link.href = `#article/${article.id}`;
                link.textContent = article.title;
                section.appendChild(link);
                section.appendChild(document.createElement('br'));
            });
            app.appendChild(section);
        }

    }

    // страница статьи
    async function renderArticlePage(id) {
        const response = await fetch(`articles/${id}.html`);
        const articleHtml = await response.text();

        const responseJson = await fetch('data/articles.json');
        const data = await responseJson.json();

        const sidebar = data.articles.map(article => `
            <a href="#article/${article.id}">${article.title}</a>
        `).join('<br>');

        app.innerHTML = `
            <div style="display: flex;">
                <div style="flex: 1; max-width: 200px; margin-right: 20px;">
                    ${sidebar}
                </div>
                <div style="flex: 3;">
                    ${articleHtml}
                </div>
            </div>
        `;
    }

    // обработка кнопок браузера
    window.addEventListener('popstate', render);

    // рендер главной(начальной) страницы
    render();
});
