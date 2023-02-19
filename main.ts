function motores () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, potIZD)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, potDRC)
}
function frenada () {
    frenar = Crucero * (1 - control2 / 10)
}
function aceleracion () {
    acelerar = (maxV - Crucero) / 10 * control2 + Crucero
}
let potIZD = 0
let potDRC = 0
let frenar = 0
let acelerar = 0
let Crucero = 0
let control2 = 0
let maxV = 0
maxV = 255
let estado = 0
control2 = 0
Crucero = Math.round(maxV * 0.8)
acelerar = 0
frenar = 0
potDRC = Crucero
potIZD = Crucero
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        // Aumentar la velocidad en rectas
        if (estado == 0 && Crucero < maxV) {
            Crucero += 1
        }
        potDRC = Crucero
        potIZD = Crucero
        estado = 0
        control2 = 0
        motores()
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        Crucero = Math.round(maxV * 0.8)
        if (estado == 1) {
            control2 += 1
        } else {
            control2 = 1
        }
        frenada()
        aceleracion()
        potDRC = acelerar
        potIZD = frenar
        estado = 1
        motores()
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        Crucero = Math.round(maxV * 0.8)
        if (estado == 2) {
            control2 += 1
        } else {
            control2 = 1
        }
        frenada()
        aceleracion()
        potDRC = frenar
        potIZD = acelerar
        estado = 2
        motores()
    } else {
        if (estado == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Crucero)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Crucero)
        }
        if (estado == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Crucero)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Crucero)
        }
        if (estado == 2) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Crucero)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Crucero)
        }
    }
    if (control2 > 10) {
        control2 = 5
    }
})
