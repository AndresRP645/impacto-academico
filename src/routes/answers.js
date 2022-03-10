const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/materias', isLoggedIn, (req, res) => {
    const materias = {
        1: {
            10: "Psicología",
            11: "Algebra Superior",
            12: "Calculo I",
            13: "Matemáticas Discretas",
            14: "Geometria Analítica",
            15: "Fundamentos de Programación"
        },

        2: {
            16: "Inglés C1",
            17: "Algebra Lineal",
            18: "Calculo II",
            19: "Ecuaciones Diferenciales",
            20: "Lenguajes y Autómatas",
            21: "Programación Orientada a Objetos"
        },

        3: {
            22: "Inglés C2",
            23: "Claculo III",
            24: "Probabilidad y Estadistica",
            25: "Física Básica",
            26: "Estructura de Datos",
            27: "Lógica Matemática"
        },

        4: {
            28: "Electricidad y Magnetismo",
            29: "Química",
            30: "Metrología",
            31: "Organización de Archivos",
            32: "Introducción a la Inteligencia Artificial",
            33: "Psicología Avanzada"
        },

        5: {
            34: "Circuitos Electricos",
            35: "Metodos Numericos",
            36: "Lenguaje Ensamblador",
            37: "Programación Web",
            38: "Fundamentos de Bases de Datos",
            39: "Introducción al Tratamiento de Imágenes"
        },

        6: {
            40: "Arquitectura de Computadoras",
            41: "Compiladores",
            42: "Sistemas Basados en conocimiento",
            43: "Bases de Datos Distribuidas",
            44: "Introducción al Reconocimiento de Patrones",
            45: "Preparación de Datos"
        },

        7: {
            46: "Redes de Computadoras I",
            47: "Sistemas Operativos",
            48: "Ingeniería de Software",
            49: "Arboles de Desición",
            50: "Minería de Datos I",
            51: "Data Warehouse I",
            52: "Evaluación e Interpretación del Conocimiento"
        },

        8: {
            53: "Redes de Computadoras II",
            54: "Sistemas Operativos Distribuidos",
            55: "Minería de Datos II",
            56: "Visualización de Datos",
            57: "Redes Neuronales Supervisadas",
            58: "Data Warehouse II",
            59: "Interpretación de Imágenes"
        },

        9: {
            60: "Algoritmos de Clasificación",
            61: "Algoritmos de Agrupamiento",
            62: "Procesamiento de Lenguaje Natural",
            63: "Reconocimiento de Patrones Sintactico-Estructural",
            64: "Redes Neuronales no Supervisadas",
            65: "Algoritmos Genéticos"
        },

        10: {
            66: "Taller de Tesis",
            67: "Robótica",
            68: "Lógica Difusa",
            69: "Practica Profesional",
            70: "Taller con Weka",
            71: "Taller de Minería de Datos",
            72: "Redes Neuronales Modulares",
            73: "Razonamiento Basado en Casos",
            74: "Graficación",
            75: "Programación con Matlab",
            76: "Agentes Inteligentes",
            77: "Maquinas de Soporte Vectorial"
        }

    };

    res.render('questions/materias', { materias });
});

router.get('/answers', isLoggedIn, (req, res) => {
    res.redirect('/materias');
});

router.post('/preguntas', isLoggedIn, (req, res) => {
    if (Object.keys(req.body).length === 0) {
        req.flash('message', 'Favor de seleccionar al menos una materia');
        res.redirect('/materias');
    }
    else {
        const materiasCursadas = req.body;

        const Preguntas = {

            desempeñoDocente: {
                "Desempeño Docente": {
                    1: "El profesor evidencia que ha preparado las clases con anticipación",
                    2: "El profesor demuestra dominio sobre el tema en las explicaciones",
                    3: "El profesor emplea variedad de ayudas audiovisuales (multimedia, diapositivas, videos, etc.)",
                    4: "El profesor aplica técnicas y estrategias de evaluación",
                    5: "El profesor se interesa por los y las estudiantes que demuestran problemas en aprender los temas de estudio",
                    6: "El profesor demuestra que conoce la clase",
                    7: "El profesor explica temas con ejemplos de la actualidad",
                    8: "El profesor utiliza variedad de recursos de enseñanza (demostraciones, lecturas, trabajo en grupo, etc.)",
                    9: "El o los procedimiento(s) de evaluación permite al alumno reflejar sus conocimientos",
                    10: "El profesor da respuestas claras a las dudas de los estudiantes",
                    11: "Los objetivos del curso se definen anticipadamente",
                    12: "El profesor muestra dominio de los temas tratados",
                    13: "El profesor crea un ambiente propicio para motivar la participación de los alumnos",
                    14: "El profesor tiene una forma de enseñar que facilita la comprensión de la materia",
                    15: "El profesor elabora los exámenes para sintetizar efectivamente la materia del curso",
                    16: "El profesor trata de acercarse y conversar con los estudiantes antes y después de clase",
                    17: "El profesor resume y enfatiza los aspectos claves de cada lección",
                    18: "El profesor integra conocimientos teóricos con los prácticos",
                    19: "El profesor tiene su forma o técnica de enseñar que facilita la comprensión de la materia",
                    20: "El profesor es imparcial a la hora de evaluar y calificar (exámenes, tareas, asignaciones, otros)",
                    21: "El profesor demuestra creatividad en las actividades de la clase",
                    22: "El profesor demuestra seguridad y confianza en lo que explica",
                    23: "El profesor realiza actividades prácticas, demostrativas y vivenciales para que los alumnos conozcan donde pueden aplicar los conocimientos",
                    24: "El profesor genera actividades en grupo que conlleven a objetivos comunes",
                    25: "El profesor se mantiene activo y dinámico cuando dirige este curso",
                    26: "El profesor planifica las actividades académicas",
                    27: "El profesor transmite sus conocimientos con entusiasmo por su asignatura",
                    28: "El profesor los recursos didácticos son acordes con los temas",
                    29: "El profesor genera retroalimentación en los exámenes, calificaciones y materiales que le ayudan a comprender el contenido de la clase",
                    30: "El profesor expresa asertivamente, las propias ideas y escucha las ajenas"
                }
            },

            desempeñoEstudiantil: {
                "Desempeño Estudiantil": {
                    31: "Asistí a todas las clases de la semana",
                    32: "Estoy satisfecho con los aprendizajes obtenidos después de cada clase",
                    33: "Vivo un ambiente de respeto en el salón de clases",
                    34: "Asisto puntualmente a las clases",
                    35: "Atiendo las explicaciones que da el profesor",
                    36: "El profesor resolvió todas mis dudas",
                    37: "Considero adecuado que las mujeres estudien ingeniería",
                    38: "Realizo las tareas y trabajos que se plantean en clase y aquellas/os extraclase",
                    39: "Las opiniones y soluciones de mis compañeros (hombres) son una aportación importante para la clase",
                    40: "Las opiniones y soluciones de mis compañeras (mujeres) son una aportación importante para la clase"
                }
            }
        }
        /*
                const identidadInstitucional = {
                    20: "Recomendarías a otras personas estudiar Ingeniería en Sistemas Inteligentes en la UAEMex",
                    21: "Te sientes identificado con la carrera y su plan de estudios"
                }*/

        req.flash('success', 'Favor de responder las siguientes preguntas');
        res.render('questions/answers', { Preguntas, materiasCursadas });
    }
});

router.post('/institucion', isLoggedIn, async (req, res) => {
    const tmp = JSON.stringify(req.body);
    const aux = JSON.parse(tmp);
    const id = req.user.id;

    const resp = {
        m10: [],
        m11: [],
        m12: [],
        m13: [],
        m14: [],
        m15: [],
        m16: [],
        m17: [],
        m18: [],
        m19: [],
        m20: [],
        m21: [],
        m22: [],
        m23: [],
        m24: [],
        m25: [],
        m26: [],
        m27: [],
        m28: [],
        m29: [],
        m30: [],
        m31: [],
        m32: [],
        m33: [],
        m34: [],
        m35: [],
        m36: [],
        m37: [],
        m38: [],
        m39: [],
        m40: [],
        m41: [],
        m42: [],
        m43: [],
        m44: [],
        m45: [],
        m46: [],
        m47: [],
        m48: [],
        m49: [],
        m50: [],
        m51: [],
        m52: [],
        m53: [],
        m54: [],
        m55: [],
        m56: [],
        m57: [],
        m58: [],
        m59: [],
        m60: [],
        m61: [],
        m62: [],
        m63: [],
        m64: [],
        m65: [],
        m66: [],
        m67: [],
        m68: [],
        m69: [],
        m70: [],
        m71: [],
        m72: [],
        m73: [],
        m74: [],
        m75: [],
        m76: [],
        m77: []
    };



    for (var i in resp) {
        for (var j in aux) {
            if (j.includes(i)) {
                const a = j.replace(i, '');
                const b = a.replace(' ', '');
                resp[i].push({ [b]: aux[j] });
            }
        }
    }

    const respuestas = [];

    for (var i in resp) {

        if (resp[i].length > 0) {
            var n = { [i]: resp[i] };
            respuestas.push(n);
        }

    }

    for (var i in respuestas) {
        var aux1 = respuestas[i];
        for (var materia in aux1) {
            var docente = "INSERT INTO desempeñoDocente ( " +
                "`id_alumno`, " +
                "`id_materia`, " +
                "`Pregunta_1`, " +
                "`Pregunta_2`, " +
                "`Pregunta_3`, " +
                "`Pregunta_4`, " +
                "`Pregunta_5`, " +
                "`Pregunta_6`, " +
                "`Pregunta_7`, " +
                "`Pregunta_8`, " +
                "`Pregunta_9`, " +
                "`Pregunta_10`, " +
                "`Pregunta_11`, " +
                "`Pregunta_12`, " +
                "`Pregunta_13`, " +
                "`Pregunta_14`, " +
                "`Pregunta_15`, " +
                "`Pregunta_16`, " +
                "`Pregunta_17`, " +
                "`Pregunta_18`, " +
                "`Pregunta_19`, " +
                "`Pregunta_20`, " +
                "`Pregunta_21`, " +
                "`Pregunta_22`, " +
                "`Pregunta_23`, " +
                "`Pregunta_24`, " +
                "`Pregunta_25`, " +
                "`Pregunta_26`, " +
                "`Pregunta_27`, " +
                "`Pregunta_28`, " +
                "`Pregunta_29`, " +
                "`Pregunta_30` " +
                ") VALUES ( " + id + ", \"" + materia + "\", ";

            var alumno = "INSERT INTO desempeñoEstudiantil ( " +
                "`id_alumno`, " +
                "`id_materia`, " +
                "`Pregunta_31`, " +
                "`Pregunta_32`, " +
                "`Pregunta_33`, " +
                "`Pregunta_34`, " +
                "`Pregunta_35`, " +
                "`Pregunta_36`, " +
                "`Pregunta_37`, " +
                "`Pregunta_38`, " +
                "`Pregunta_39`, " +
                "`Pregunta_40`" +
                ") VALUES ( " + id + ", \"" + materia + "\", ";
            var aux2 = aux1[materia];

            for (var k in aux2) {
                var aux3 = aux2[k];
                for (var l in aux3) {
                    const respuesta = aux3[l];
                    const preg = parseInt(l.replace('p', ''));
                    if (preg < 30) {
                        docente += respuesta + ", ";
                    }
                    else if (preg === 30) {
                        docente += respuesta;
                    }
                    else if (preg > 30 && preg < 40) {
                        alumno += respuesta + ", ";
                    }
                    else if (preg === 40) {
                        alumno += respuesta;
                    }

                }
            }
            docente += ");";
            alumno += ");";
            await pool.query(docente);
            await pool.query(alumno);
        }
    }

    if (id === undefined) {
        
        req.logOut();
        req.flash('message', 'ocurrio un error ingresa de nuevo por favor');
        res.redirect('/login');
        req.session.destroy();
    }
    else {
        const identidadInstitucional = {
            41: "Recomendarías a otras personas estudiar Ingeniería en Sistemas Inteligentes en la UAEMex",
            42: "Te sientes identificado con la carrera y su plan de estudios"
        }
        res.render('questions/recomendacion', { identidadInstitucional });
    }
});

router.post('/send', isLoggedIn, async (req, res) => {

    const { p41, p42 } = req.body;
    const id = req.user.id;

    const sql = "INSERT INTO `identidadInstitucional` (`id_alumno`, `Pregunta_41`, `Pregunta_42`) VALUES (" + id + ", " + p41 + ", " + p42 + ");";

    await pool.query(sql);
    
    req.logOut();
    req.flash('success', 'Respuestas enviadas Exitosamente');
    res.redirect('/login');
    req.session.destroy();

});


module.exports = router;
