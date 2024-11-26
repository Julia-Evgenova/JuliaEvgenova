/*создать класс авто в котором будет массив wheels который будет состоять 
из 4 объектов типо колесо wheel у каждого из этих объектов должны быть характеристики
тип оси : передняя, задняя и скорость вращения, которая будет = по умолчанию 0
сам класс авто должен содержать метод изменения скорости вращения скорости всех
колес и метод полчения скорости всех колес*/



var w = {}

w['asd'] = 123

var key = 'asd'
w[key]
w['asd']
w.asd

var w = {}
w['f1'] = function () { return 1 }
w['f1'] = () => { return 1 }
console.log(w.f1())


class W {
    constructor() {
        this.asd = 123
    }

    f1() {
        return 1
    }
}

var w = new W()
var v = new W(p = 78)








class Wheel {
    constructor(pressure = 0) {
        this.pressure = pressure
    }
}

let wheel = new Wheel(pressure = 10)
wheel.pressure




class Auto {
    constructor(wheelsCount = 4) {
        this.wheelsCount = wheelsCount
        
    }

    wheelsCountChange(wheelsCount) {
        this.wheelsCount = wheelsCount
    }

    getWheelsCount() {
        return this.wheelsCount
    }

    printWheelsCount() {
        console.log(this.getWheelsCount())
    }
    
}

let car = new Auto(wheelsCount = 3)
car.wheelsCountChange(2)
car.printWheelsCount()





w['country'] = 'Belarus'
w['City'] = 'Minsk'

let country = 'Belarus'

const w = {
    'country': country
}



class Wheel {
    constructor(axe, side, rotation_speed = 0) {
        this.axe = axe
        this.side = side
        this.rotation_speed = rotation_speed
    }

    setRotationSpeed(rotation_speed = 0) {
        this.rotation_speed = rotation_speed
    }
}

const wheel1 = new Wheel('front', 'left')

wheel1.setRotationSpeed(12)

wheel1.axe = 'sdfdsdsdfs'


class Auto {
    constructor() {
        this.wheels = [
            new Wheel('front', 'left'),
            new Wheel('front', 'right'),
            new Wheel('back', 'left'),
            new Wheel('back', 'right')
        ]
    }
}
