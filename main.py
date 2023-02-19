def motores():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, potIZD)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, potDRC)
def frenada():
    global frenar
    frenar = Crucero * (1 - control2 / 10)
def aceleracion():
    global acelerar
    acelerar = (maxV - Crucero) / 10 * control2 + Crucero
potIZD = 0
potDRC = 0
frenar = 0
acelerar = 0
Crucero = 0
control2 = 0
maxV = 0
maxV = 200
estado = 0
control2 = 0
Crucero = maxV
acelerar = 0
frenar = 0
potDRC = Crucero
potIZD = Crucero

def on_forever():
    global potDRC, potIZD, estado, control2
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        potDRC = Crucero
        potIZD = Crucero
        estado = 0
        control2 = 0
        motores()
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        if estado == 1:
            control2 += 1
        else:
            control2 = 1
        frenada()
        aceleracion()
        potDRC = acelerar
        potIZD = frenar
        estado = 1
        motores()
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        if estado == 2:
            control2 += 1
        else:
            control2 = 1
        frenada()
        aceleracion()
        potDRC = frenar
        potIZD = acelerar
        estado = 2
        motores()
    else:
        if estado == 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, Crucero)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, Crucero)
        if estado == 1:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, Crucero)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, Crucero)
        if estado == 2:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, Crucero)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, Crucero)
    if control2 > 10:
        control2 = 5
basic.forever(on_forever)
