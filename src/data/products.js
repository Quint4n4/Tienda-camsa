export const products = [
    {
        id: 1,
        slug: "nano-exom",
        name: "Nano-Exom (Exosomas)",
        price: 1500,
        category: "Activdador de la microcirculacion",
        image: "/imagenes/Nano-exom.png",
        flyer: "/imagenes/Nano-exom-flayer.jpg",
        post: "/imagenes/Nano-exom-post.jpg",
        video: "https://www.youtube.com/watch?v=-CT8xRcYAlE&list=PLxQdvKQUMT4TgmPXMmyq3HaOcAVv0JNam&index=6",
        description: "Crema con exosomas. Regenerador tópico de tejidos, con efecto analgésico y antiinflamatorio local.",
        features: ["Alta pureza", "Fácil reconstitución", "Potenciador celular"],
        tagline: "Regentados tópico de tejidos con factor transdermico. Efecto analgésico y antiinflamatorio local ",
        productType: "Serum líquido",
        volume: "50ml",
        uses: [
            "Tratamiento de neuropatía diabética periférica",
            "Esclerosis múltiple",
            "Várices y arañas vasculares",
            "Recuperación de zonas tópicas afectadas por procesos trombóticos en extremidades inferiores"
        ],
        benefits: [
            "Favorece la disminución de síntomas de dolor (piquetes, ardor, hormigueo) e incrementa la sensibilidad de la zona afectada",
            "Incrementa el tono venoso",
            "Favorece la producción de mielina",
            "Favorece la formación de vasos capilares",
            "Revitaliza la piel con efecto redensificador",
            "Produce efecto refrescante inmediato",
            "Favorece la humectación de la piel"
        ]
    },
    {
        id: 2,
        slug: "alivium",
        name: "Alivium ",
        price: 1000,
        category: "Cuidado Tópico",
        image: "/imagenes/ALIVIUM-IMG.JPG",
        flyer: "/imagenes/Alivium-flayer.jpg",
        post: "/imagenes/Alivium-post.jpg",
        video: "https://www.youtube.com/watch?v=0OyGRv_y0lA&list=PLxQdvKQUMT4TgmPXMmyq3HaOcAVv0JNam&index=8",
        description: "Desinflamatorio de amplio espectro Alivium tratamiento para el dolor crónico degenerativo",
        features: ["Absorción rápida", "Efecto frío/calor", "Ingredientes naturales"],
        tagline: "Desinflamatorio de amplio espectro Alivium tratamiento para el dolor crónico degenerativo",
        productType: "Serum líquido",
        volume: "50ml",
        uses: [
            "Artritis reumatoide",
            "Artrosis",
            "Neuralgias y afecciones del nervio ciático",
            "Tortícolis",
            "Lumbalgia y dorsalgia",
            "Lesiones deportivas",
            "Contusiones",
            "Dolor por mala postura",
            "Síndrome de piernas cansadas"
        ],
        benefits: [
            "Favorece la relajación muscular",
            "Reduce la tensión y mejora la circulación",
            "Gracias a su activo Factor Transdérmico penetra muy eficientemente en la zona de dolor o inflamación"
        ]
    },
    {
        id: 3,
        slug: "nasagest",
        name: "Nasagest Solución",
        price: 100+"pz"  + " - 6pz. X $500",
        category: "Cuidado Respiratorio",
        image: "/imagenes/NASAGEST.png",
        flyer: "/imagenes/nasagest-flayer.jpg",
        post: "/imagenes/nasagest-post.jpg",
        video: "https://videos.pexels.com/video-files/6620586/6620586-uhd_2560_1440_25fps.mp4",
        description: "Esencia de eucalipto. Descongestionante, relajante y antiséptico. Uso tópico y ambiental.",
        features: ["Isotónica", "Sin conservantes", "Uso diario"],
        tagline: "Descongestionante, relajante y antiséptico. Uso tópico y ambiental.",
        productType: "Spray bajo fricción",
        volume: "10ml",
        uses: [
            "En casos de gripa",
            "Escurrimiento nasal",
            "Auxiliar en tos seca",
            "Auxiliar en tos con flema",
            "Migraña",
            "Cólicos",
            "Estrés",
            "Sinusitis",
            "Rinitis congestiva",
            "Insomnio",
            "Repelente de mosquitos",
            "Calambres",
            "En algunos casos de asma"
        ],
        benefits: [
            "Auxiliar como desinfectante",
            "Antiséptico de inhalación bajo fricción",
            "Descongestionante nasal",
            "Relajante y desestresante",
            "Mejora la capacidad ventilatoria",
            "Contribuye a la oxigenación del cerebro",
            "Auxiliar en la disminución de dolores",
            "Expande los bronquios",
            "Expande las fosas nasales para mejorar la respiración",
            "Ayuda en depresión, ansiedad, irritabilidad y nerviosismo"
        ],
        modeOfUse: "Aplicar de 2 a 3 disparos sobre las palmas de las manos, frotar generando fricción e inhalar. Puedes repetirlo hasta 4 veces al día. Puede usarse como antiséptico de superficies, inhalado en vía aérea, repelente de mosquitos y aromaterapia."
    },
    {
        id: 4,
        slug: "acquaminerales",
        name: "Acquaminerales",
        price: 1500,
        category: "Suplementación",
        image: "/imagenes/ACUAMINERALES.png",
        flyer: "/imagenes/acquaminerales-flayer.jpg",
        post: "/imagenes/acquaminerales-post.jpg",
        video: "https://www.youtube.com/watch?v=FKRxvkO7BO4&list=PLxQdvKQUMT4TgmPXMmyq3HaOcAVv0JNam&index=7",
        description: "Solución rica en minerales esenciales para hidratación y balance electrolítico.",
        tagline: "Restaurador del equilibrio mineral",
        features: ["Minerales traza", "Hidratación profunda", "Origen natural"],
        uses: [
            "Deshidratación",
            "Fatiga y bajo rendimiento",
            "Desequilibrio electrolítico",
            "Suplementación mineral"
        ],
        benefits: [
            "Favorece la hidratación celular",
            "Contribuye al balance electrolítico",
            "Origen natural"
        ],
        modeOfUse: "Tomar según indicación médica. Consulta el flyer para más detalles."
    },
    {
        id: 5,
        slug: "nanoparticulas",
        name: "Nanopartículas",
        price: 1500,
        category: "Nanotecnología",
        image: "/imagenes/MANOPARTICULASDECOBREIONICO.png",
        flyer: "/imagenes/nanoparticulasdecobre-flayer.jpg",
        post: "/imagenes/nanoparticulasedecobre-post.jpg",
        video: "https://youtu.be/1kkfyvE5D98?si=IxBuy9pTDDvr5oZr",
        description: "Solución coloidal de cobre con alta capacidad antimicrobiana y regenerativa.",
        tagline: "Nanotecnología con cobre iónico para uso antimicrobiano y regenerativo.",
        features: ["Nanotecnología", "Alta estabilidad", "Uso versátil"],
        uses: [
            "Propiedades antimicrobianas",
            "Regeneración celular",
            "Aplicación tópica"
        ],
        benefits: [
            "Alta capacidad antimicrobiana",
            "Alta estabilidad coloidal",
            "Uso versátil"
        ],
        modeOfUse: "Usar según indicación médica. Consulta el flyer para más detalles."
    },
    {
        id: 6,
        slug: "vaxmi",
        name: "Vaxmi Inmunomodulador",
        price: 500,
        category: "Depurador y desintoxicador",
        image: "/imagenes/VAXMI.png",
        video: "https://www.youtube.com/watch?v=ri1LLpIU7as&list=PLxQdvKQUMT4TgmPXMmyq3HaOcAVv0JNam&index=2",
        description: "Depurador y desintoxicador linfático, hepatico y gastrointestinal ",
        features: ["Respuesta rápida", "Seguro", "Efecto prolongado"]
    },
    {
        id: 7,
        slug: "sales",
        name: "Sales de Epson",
        price: 500,
        category: "Desintoxicador de toxinas",
        image: "/imagenes/SALES.png",
        flyer: "/imagenes/Sales-flayer.jpg",
        post: "/imagenes/Sales-post.jpg",
        video: "https://www.youtube.com/watch?v=puNTSPXyrrQ",
        tagline: "Complemento natural para mejorar tu calidad de vida. Con cristales minerales naturales que se obtienen directamente por evaporación del agua del mar. A diferencia de las sales comunes, conservan sus minerales esenciales.",
        uses: [
            "Dolor e hinchazón",
            "Preeclamsia y eclamsia",
            "Problemas cardiovasculares",
            "Estreñimiento",
            "Migraña",
            "Asma severa"
        ],
        benefits: [
            "Purifican y desintoxican el cuerpo",
            "Mejoran el descanso y reducen el estrés",
            "Estimulan la circulación y alivian la fatiga muscular",
            "Suavizan la piel y eliminan impurezas",
            "Representan un momento de autocuidado físico y emocional"
        ],
        modeOfUse: "Contiene magnesio, potasio, calcio y zinc. Usar según indicación."
    },
    {
        id: 8,
        slug: "zeolita",
        name: "Zeolita Activada",
        price: 600,
        category: "Suplemento",
        image: "/imagenes/ZEOLITA.png",
        flyer: "/imagenes/Zeolita-flayer.jpg",
        post: "/imagenes/Zeolita-post.jpg",
        video: "https://youtu.be/9guxFzxFMRo?si=5mLXteQRBC6SD56P",
        tagline: "Suplemento alimenticio enriquecido con calcio, regula el pH, elimina las toxinas y ayuda a fijar bioelementos que estimulan el metabolismo del organismo.",
        uses: [
            "Desintoxicación y eliminación de toxinas",
            "Regulación del pH corporal",
            "Apoyo al metabolismo",
            "Equilibrio ácido-base"
        ],
        benefits: [
            "Apoya la función del sistema inmunológico y promueve el equilibrio ácido-base en el cuerpo",
            "Reconocida por su potencial para mejorar la absorción de nutrientes esenciales",
            "Mineral volcánico micronizado para desintoxicación profunda"
        ],
        modeOfUse: "Contiene clinoptilolita, sodio, calcio, hierro, magnesio, entre otros. Usar según indicación."
    },
    {
        id: 9,
        slug: "shot5",
        name: "Shot 5 Revitalizante",
        price: 1500,
        category: "Inmunológico",
        image: "/imagenes/Shot5-2.png",
        flyer: "/imagenes/Shot5-flayer.jpg",
        post: "/imagenes/Shot5-post.jpg",
        video: "https://videos.pexels.com/video-files/8317377/8317377-uhd_2560_1440_25fps.mp4",
        tagline: "Shot concentrado de vitaminas y energía para el rendimiento diario. Fórmula práctica para momentos que demandan vitalidad y concentración.",
        uses: [
            "Baja energía y fatiga",
            "Rendimiento físico y mental",
            "Recuperación post-esfuerzo",
            "Apoyo en actividad deportiva"
        ],
        benefits: [
            "Energía inmediata",
            "Sabor agradable y práctico de tomar",
            "Concentrado de vitaminas esenciales",
            "Favorece la vitalidad y concentración"
        ],
        modeOfUse: "Tomar un shot según la indicación medica."
    }
];
