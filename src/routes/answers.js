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
                    1: "El método de enseñanza que utiliza el profesor te parece adecuado",
                    2: "El profesor asistió a todas sus clases durante la semana",
                    3: "El profesor acepta que los alumnos tengas posturas (pensamientos e ideas) diferentes a las que el plantea",
                    4: "Los temas que se estudiaron en esta semana se encuentran dentro de los contenidos programados",
                    5: "El profesor fomenta la participación tanto de hombres como de mujeres",
                    6: "La clase fue planeada y preparada previo a ser presentada por el profesor",
                    7: "El profesor presenta suficiente material didáctico en las clases",
                    8: "El profesor muestra profesionalismo en la clase",
                    9: "El profesor presenta conocimiento y dominio de la materia"
                }
            },

            desempeñoEstudiantil: {
                "Desempeño Estudiantil": {
                    10: "Asistí a todas las clases de la semana",
                    11: "Estoy satisfecho con los aprendizajes obtenidos después de cada clase",
                    12: "Vivo un ambiente de respeto en el salón de clases",
                    13: "Asisto puntualmente a las clases",
                    14: "Atiendo las explicaciones que da el profesor",
                    15: "El profesor resolvió todas mis dudas",
                    16: "Considero adecuado que las mujeres estudien ingeniería",
                    17: "Realizo las tareas y trabajos que se plantean en clase y aquellas/os extraclase",
                    18: "Las opiniones y soluciones de mis compañeros (hombres) son una aportación importante para la clase",
                    19: "Las opiniones y soluciones de mis compañeras (mujeres) son una aportación importante para la clase"
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
                "`Pregunta_9`" +
                ") VALUES ( " + id + ", \"" + materia + "\", ";

            var alumno = "INSERT INTO desempeñoEstudiantil ( " +
                "`id_alumno`, " +
                "`id_materia`, " +
                "`Pregunta_10`, " +
                "`Pregunta_11`, " +
                "`Pregunta_12`, " +
                "`Pregunta_13`, " +
                "`Pregunta_14`, " +
                "`Pregunta_15`, " +
                "`Pregunta_16`, " +
                "`Pregunta_17`, " +
                "`Pregunta_18`, " +
                "`Pregunta_19`" +
                ") VALUES ( " + id + ", \"" + materia + "\", ";
            var aux2 = aux1[materia];

            for (var k in aux2) {
                var aux3 = aux2[k];
                for (var l in aux3) {
                    const respuesta = aux3[l];
                    const preg = parseInt(l.replace('p', ''));
                    if (preg < 9) {
                        docente += respuesta + ", ";
                    }
                    else if (preg === 9) {
                        docente += respuesta;
                    }
                    else if (preg > 9 && preg < 19) {
                        alumno += respuesta + ", ";
                    }
                    else if (preg === 19) {
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
    }
    else {
        const identidadInstitucional = {
            20: "Recomendarías a otras personas estudiar Ingeniería en Sistemas Inteligentes en la UAEMex",
            21: "Te sientes identificado con la carrera y su plan de estudios"
        }
        res.render('questions/recomendacion', { identidadInstitucional });
    }
});

router.post('/send', isLoggedIn, async (req, res) => {
    
    const {p20, p21} =  req.body;
    const id = req.user.id;

    const sql = "INSERT INTO `identidadInstitucional` (`id_alumno`, `Pregunta_20`, `Pregunta_21`) VALUES (" + id + ", " + p20 + ", " + p21 + ");";
    
    await pool.query(sql);

    req.logOut();
    req.flash('success', 'Respuestas enviadas Exitosamente');
    res.redirect('/login');
    
    
});


module.exports = router;
