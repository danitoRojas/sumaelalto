from flask import Flask, send_file
from waitress import serve
from flask_mail import Mail, Message
import controlador
from flask import Flask, render_template, request, redirect, url_for, jsonify,session
from dotenv import load_dotenv
import os
import psycopg2
from datetime import datetime


app = Flask(__name__,template_folder='templates')
app.secret_key = "pinchellave"



# para que se vean las paginas
@app.route('/')
def index():
  return render_template('public/index.html')

@app.route('/user')
def user():
  return render_template('public/index_user.html')

@app.route('/mapa')
def mapa():
  return render_template('public/mapa.html')
# ###########################################################################3333


@app.route('/registro')
def resgistro():
  return render_template('public/frm_registro.html')

 ###################### pacientes  ##########################################3
@app.route("/paciente")
def paciente():
    resultadosp = controlador.ver()
    return render_template('public/frm_paciente.html', datax=resultadosp)
  
@app.route("/eliminar", methods=["POST"])
def eliminar():
    controlador.eliminar(request.form["id"])
    return redirect("/paciente")

@app.route('/formulario')
def formulario():
  return render_template('public/frm_nuevo_p.html')

@app.route("/agregar", methods=["POST"])
def agregar():
  nombre = request.form['nombre']
  apellidos = request.form['apellidos']
  ci = request.form['ci']
  fecha_nacimiento = request.form['fecha_nacimiento']
  genero = request.form['genero']
  celular = request.form['celular']
  direccion = request.form['direccion']
  correo = request.form['correo']
  id_rol = request.form['id_rol']
  img_paciente = request.form['img_paciente']
  password = request.form['password']
  controlador.insertar(nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol,img_paciente, password)
  
  
# Validar
  if len(password) < 8:
    if len(celular) != 8:
        error_message1 = "La contraseña debe tener al menos 8 caracteres y celular 8 digitos numericos."
        return render_template('/public/login.html', error_message1=error_message1)
    else:
        error_message = "La contraseña debe tener al menos 8 caracteres."
        return render_template('/public/login.html', error_message=error_message)
  elif len(celular) != 8:
    error_message2 = "El celular debe tener al menos 8 digitos numericos."
    return render_template('/public/login.html', error_message2=error_message2)
  
  if len(ci) < 7 or len(ci) > 9:
    error_message3 = "El CI debe tener al menos 7 caracteres o menos de 9 caracteres."
    return render_template('/public/login.html', error_message3=error_message3)

  return render_template('public/index.html', valor_rol=request.form['id_rol'])


@app.route("/editar/<int:id>")
def editar_paciente(id):
    # Obtener paciente por ID
    datap = controlador.obtener_paciente_por_id(id)
    return render_template("public/frm_editar_p.html", datap=datap)

@app.route("/actualizar_paciente", methods=["POST"])
def actualizar_paciente():
  id = request.form["id_paciente"]
  nombre = request.form['nombre']
  apellidos = request.form['apellidos']
  ci = request.form['ci']
  fecha_nacimiento = request.form['fecha_nacimiento']
  genero = request.form['genero']
  celular = request.form['celular']
  direccion = request.form['direccion']
  correo = request.form['correo']
  id_rol = request.form['id_rol']
  img_paciente = request.form['img_paciente']
  password = request.form['password']
  controlador.actualizar(id,nombre, apellidos, ci, fecha_nacimiento, genero, celular, direccion, correo, id_rol, img_paciente, password)
  return redirect("/paciente")

######################   Especialidades  ###################################
@app.route("/especialidad")
def especialidad():
    resultados_especialidades = controlador.ver_especialidad()
    return render_template('public/frm_especialidad.html', datae=resultados_especialidades)
  
@app.route("/especialidad_user")
def especialidad_user():
    resultados_especialidades = controlador.ver_especialidad()
    return render_template('public/frm_especialidad_user.html', datae=resultados_especialidades)
  
#######################   Especialidad    ##############################

@app.route("/ver_especialidad/<int:id>")
def ver_especialidad(id):
    # Obtener todas las especialidades por ID
    data_especialidades = controlador.obtener_especialidades_por_id(id)
    return render_template("public/frm_esp_hosp.html", data_especialidades=data_especialidades)



# ######################   Hospitale   s###################################

@app.route("/hospital")
def hospital():
    resultados_hospitales = controlador.ver_hospitales()
    return render_template('public/frm_hospital.html', datah=resultados_hospitales)
  
@app.route("/hospital_user")
def hospital_user():
    resultados_hospitales = controlador.ver_hospitales()
    return render_template('public/frm_hospital_user.html', datah=resultados_hospitales)

@app.route("/eliminar_hospital", methods=["POST"])
def eliminar_hospital():
    controlador.eliminar_hospital(request.form["id"])
    return redirect("/hospital")

@app.route('/nuevo_hospital')
def nuevo_hospital():
    return render_template('public/frm_nuevo_h.html')

@app.route("/agregar_hospital", methods=["POST"])
def agregar_hospital():
    nombre = request.form['nombre']
    direccion = request.form['direccion']
    celular = request.form['celular']
    nivel = request.form['nivel']
    hora_inicio = request.form['hora_inicio']
    hora_fin = request.form['hora_fin']
    nombre_director = request.form['nombre_director']
    geom = request.form['geom']
    controlador.insertar_hospital(nombre, direccion, celular, nivel, hora_inicio, hora_fin, nombre_director, geom)
    return redirect("/hospital")

@app.route("/editar_hospital/<int:id>")
def editar_hospital(id):
    # Obtain hospital by ID
    data_hospital = controlador.obtener_hospital_por_id(id)
    return render_template("public/frm_editar_h.html", data_hospital=data_hospital)

@app.route("/actualizar_hospital", methods=["POST"])
def actualizar_hospital():
    id = request.form["gid"]
    nombre = request.form['nombre']
    direccion = request.form['direccion']
    celular = request.form['celular']
    nivel = request.form['nivel']
    hora_inicio = request.form['hora_inicio']
    hora_fin = request.form['hora_fin']
    nombre_director = request.form['nombre_director']
    geom = request.form['geom']
    controlador.actualizar_hospital(id, nombre, direccion, celular, nivel, hora_inicio, hora_fin, nombre_director, geom)
    return redirect("/hospital")
#################################### Medicos###################################
@app.route("/medico1")
def medico1():
    resultados_medico1 = controlador.ver_medico1()
    return render_template('public/frm_medico1.html', datam1=resultados_medico1)
  
@app.route("/medico")
def medico():
    resultados_medico = controlador.ver_medico()
    return render_template('public/frm_medico.html', datam=resultados_medico)

@app.route("/eliminar_medico", methods=["POST"])
def eliminar_medico():
    controlador.eliminar_medico(request.form["id"])
    return redirect("/medico")

@app.route('/nuevo_medico')
def nuevo_medico():
    return render_template('public/frm_nuevo_m.html')

@app.route("/agregar_medico", methods=["POST"])
def agregar_medico():
    nombre = request.form['nombre']
    apellidos = request.form['apellidos']
    ci = request.form['ci']
    fecha_nacimiento = request.form['fecha_nacimiento']
    celular = request.form['celular']
    direccion = request.form['direccion']
    correo = request.form['correo']
    num_colegiatura = request.form['num_colegiatura']
    id_usuario = request.form['id_usuario']
    genero = request.form['genero']
    img_medico = request.form['img_medico']
    id_hospital = request.form['id_hospital']
    controlador.insertar_medico(nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital)
    return redirect("/medico")

@app.route("/editar_medico/<int:id>")
def editar_medico(id):
    # Obtain medico by ID
    data_medico = controlador.obtener_medico_por_id(id)
    return render_template("public/frm_editar_m.html", data_medico=data_medico)

@app.route("/actualizar_medico", methods=["POST"])
def actualizar_medico():
    id = request.form["id_medico"]
    nombre = request.form['nombre']
    apellidos = request.form['apellidos']
    ci = request.form['ci']
    fecha_nacimiento = request.form['fecha_nacimiento']
    celular = request.form['celular']
    direccion = request.form['direccion']
    correo = request.form['correo']
    num_colegiatura = request.form['num_colegiatura']
    id_usuario = request.form['id_usuario']
    genero = request.form['genero']
    img_medico = request.form['img_medico']
    id_hospital = request.form['id_hospital']
    controlador.actualizar_medico(id, nombre, apellidos, ci, fecha_nacimiento, celular, direccion, correo, num_colegiatura, id_usuario, genero, img_medico, id_hospital)
    return redirect("/medico")

#################################### login  ###################################

def obtener_conexion():
    # Aquí debes agregar los detalles de conexión a tu base de datos
    conexion = psycopg2.connect(
      host="localhost",
      database="SALUD",
      user="postgres",
      password="admin",
      port= 5432
    )
    return conexion
  

@app.route('/login')
def home():
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    return render_template('public/login.html', fecha_actual=fecha_actual) # Renderiza la página del formulario con la fecha actual




@app.route('/login2')
def log():
    return render_template('public/frm_login.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')

# ACCESO---LOGIN
@app.route('/acceso-login', methods=["GET", "POST"])
def lacceso_login():
    if request.method == 'POST' and 'txtCorreo' in request.form and 'txtPassword' in request.form:
        _correo = request.form['txtCorreo']
        _password = request.form['txtPassword']

        conexion = obtener_conexion()
        cur = conexion.cursor()
        cur.execute('SELECT * FROM paciente WHERE correo = %s AND password = %s', (_correo, _password))
        account = cur.fetchone()

        if account:
            session['logueado'] = True
            session['id'] = account[0]  # Índice correspondiente al campo 'id'
            session['id_rol'] = account[9]  # Índice correspondiente al campo 'id_rol'
              # Verificas si existe un mensaje de error en la sesión y lo eliminas
            if 'mensaje' in session:
                del session['mensaje']  


            if session['id_rol'] == 1:
                return render_template("/public/index.html")# Índice correspondiente al campo 'id_rol'
            elif session['id_rol'] == 3:
                return redirect("/user")# Índice correspondiente al campo 'id_rol'
            elif session['id_rol'] == 2:
              return redirect("/")# Índice correspondiente al campo 'id_rol'
        else:
            return render_template('public/login.html', mensaje="Usuario O Contraseña Incorrectas")

        cur.close()
        conexion.close()

#registro---
@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/crear-registro', methods=["GET", "POST"])
def crear_registro():
    if request.method == 'POST' and 'txtCorreo' in request.form and 'txtPassword' in request.form:
        correo = request.form['txtCorreo']
        password = request.form['txtPassword']

        conexion = obtener_conexion()
        cur = conexion.cursor()
        cur.execute("INSERT INTO usuario (correo, password, id_rol) VALUES (%s, %s, '2')", (correo, password))
        conexion.commit()
        cur.close()
        conexion.close()

        return render_template("frm_login.html", mensaje2="Usuario Registrado Exitosamente")

#-----LISTAR USUARIOS-------------
@app.route('/listar', methods=["GET", "POST"])
def listar():
    conexion = obtener_conexion()
    cur = conexion.cursor()
    cur.execute("SELECT * FROM usuario")
    usuarios = cur.fetchall()
    cur.close()
    conexion.close()

    return render_template("listar_usuarios.html", usuarios=usuarios)


################ fichas ########################################

@app.route("/ficha")
def ficha():
    resultados_ficha = controlador.ver_fichas()
    return render_template('public/frm_ficha.html', dataf=resultados_ficha)

@app.route("/t_ficha")
def t_ficha():
    resultados_ficha = controlador.ver_fichas()
    return render_template('public/frm_t_ficha.html', dataf=resultados_ficha)
  
@app.route("/eliminar_ficha", methods=["POST"])
def eliminar_ficha():
    controlador.eliminar_ficha(request.form["id"])
    return redirect("/ficha")
  
@app.route('/formulario_ficha')
def formulario_ficha():
    resultados_hosp = controlador.ver_hospitales()
    resultados_hos_esp=controlador.ver_hos_esp()
    resultados_horario=controlador.ver_horario()
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    return render_template('public/frm_nuevo_f.html',data_hosp=  resultados_hosp, data_hos_esp= resultados_hos_esp,data_horario=resultados_horario,fecha_actual=fecha_actual)


# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'angel.mrd.jb@gmail.com'  # Reemplaza con tu dirección de correo
app.config['MAIL_PASSWORD'] = 'mztq tbck rnid jotx'  # Reemplaza con la contraseña de tu correo
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)



@app.route('/agregar_ficha', methods=['POST'])
def agregar_ficha():
    if request.method == 'POST':
        # Obtén los datos del formulario
        fecha_atencion = request.form['fecha_atencion']
        fecha_registro = request.form['fecha_registro']
        id_hos_esp = request.form['id_hos_esp']
        id_paciente = request.form['id_paciente']
        id_horario = request.form['id_horario']
        controlador.insertar_ficha(fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario)
        
        # Otros campos del formulario...
        # Enviar el correo electrónico con los datos del formulario
        msg = Message('Nueva ficha', sender='angel.mrd.jb@gmail.com', recipients=['Paolaapaza57@gmail.com'])
        msg.body = f'Fecha de Atención: {fecha_atencion}\nFecha de Registro: {fecha_registro}\nID Hospital/Especialidad: {id_hos_esp}\nID Paciente: {id_paciente}\nID Horario: {id_horario}\n'  
        try:
            mail.send(msg)
            #return 'Ficha enviada correctamente por correo electrónico'
            return redirect("/t_ficha")
        except Exception as e:
            return f'Error al enviar la ficha por correo electrónico: {str(e)}'


        





@app.route("/editar_ficha/<int:id>")
def editar_ficha(id):
    data_ficha = controlador.obtener_ficha_por_id(id)
    return render_template("public/frm_editar_f.html", data_ficha=data_ficha)

@app.route("/actualizar_ficha", methods=["POST"])
def actualizar_ficha():
    id_ficha = request.form["id_ficha"]
    fecha_atencion = request.form['fecha_atencion']
    fecha_registro = request.form['fecha_registro']
    id_hos_esp = request.form['id_hos_esp']
    id_paciente = request.form['id_paciente']
    id_horario = request.form['id_horario']
    controlador.actualizar_ficha(id_ficha, fecha_atencion, fecha_registro, id_hos_esp, id_paciente, id_horario)
    return redirect("/ficha")

######################## Usuario ######


@app.route("/usuario")
def usuario():
    resultados_usuario = controlador.ver_usuario()
    return render_template('public/frm_usuario.html', datau=resultados_usuario)

@app.route("/eliminar_usuario", methods=["POST"])
def eliminar_usuario():
    controlador.eliminar_usuario(request.form["id"])
    return redirect("/usuario")

@app.route('/nuevo_usuario')
def nuevo_usuario():
    return render_template('public/frm_nuevo_u.html')
  
  

@app.route("/agregar_usuario", methods=["POST"])
def agregar_usuario():
    password = request.form['password']
    id_rol = request.form['id_rol']
    correo = request.form['correo']
    controlador.insertar_usuario(password, id_rol, correo)
    return render_template('public/login_primero.html')

@app.route("/editar_usuario/<int:id>")
def editar_usuario(id):
    # Obtener usuario por ID
    data_usuario = controlador.obtener_usuario_por_id(id)
    return render_template("public/frm_editar_u.html", data_usuario=data_usuario)

@app.route("/actualizar_usuario", methods=["POST"])
def actualizar_usuario():
    id = request.form["id_usuario"]
    
    password = request.form['password']
    id_rol = request.form['id_rol']
    correo = request.form['correo']
    controlador.actualizar_usuario(id, password, id_rol, correo)
    return redirect("/usuario")


@app.route('/p_login')
def p_login():
    return render_template('public/login_primero.html')

if __name__ == '__main__':
  serve(app, host="0.0.0.0", port=8083)
  app.run()
  
  
  