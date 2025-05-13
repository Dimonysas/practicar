import gsap from 'gsap';
import { ScrollTrigger } from 'scrollTrigger';
import Swiper from 'swiper';

// Inicializar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Función para iniciar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initSwiperSlider();
    initCursosFilter();
    initCalculadora();
    initQuiz();
    initCountdown();
    initContactForm();
    initVideoPlayers();
});

// Navegación
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Toggle del menú móvil
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animaciones
function initAnimations() {
    // Animación para el hero section
    gsap.from('.hero-content', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.7
    });
    
    // Animación para las tarjetas de ventajas
    gsap.from('.ventaja-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.ventajas-grid',
            start: 'top 80%'
        }
    });
    
    // Animación para las tarjetas de cursos
    gsap.from('.curso-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.cursos-grid',
            start: 'top 80%'
        }
    });
    
    // Animación para timeline de proceso
    gsap.from('.timeline-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.proceso-timeline',
            start: 'top 80%'
        }
    });
}

// Sliders (Testimonios y Novedades)
function initSwiperSlider() {
    // Testimonios Slider
    const testimoniosSlider = new Swiper('.testimonios-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true
    });

    // Novedades Slider
    const novedadesSlider = new Swiper('.novedades-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
         pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
             768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        loop: true
    });
}

// Filtro de cursos
function initCursosFilter() {
    const filterButtons = document.querySelectorAll('.tab-button');
    const courseCards = document.querySelectorAll('.curso-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase activa al botón clickeado
            button.classList.add('active');
            
            const categoria = button.getAttribute('data-categoria');
            
            // Filtrar tarjetas de cursos
            courseCards.forEach(card => {
                if (categoria === 'all' || card.getAttribute('data-categoria') === categoria) {
                    card.style.display = 'block';
                    gsap.to(card, { opacity: 1, y: 0, duration: 0.4 });
                } else {
                    gsap.to(card, { 
                        opacity: 0, 
                        y: 20, 
                        duration: 0.4,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Calculadora de cursos
function initCalculadora() {
    const optionCards = document.querySelectorAll('.calculadora-form .option-card'); 
    const nextButtons = document.querySelectorAll('.calculadora-form .btn-next'); 
    const prevButtons = document.querySelectorAll('.calculadora-form .btn-prev'); 
    const calcSteps = document.querySelectorAll('.calc-step');
    
    let seleccionVehiculo = '';
    let seleccionExperiencia = '';
    
    // Selección de opciones
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Desactivar todas las tarjetas del mismo grupo
            const parentStep = card.closest('.calc-step');
            parentStep.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Activar tarjeta seleccionada
            card.classList.add('selected');
            
            // Guardar selección
            if (parentStep.id === 'step1') {
                seleccionVehiculo = card.getAttribute('data-value');
            } else if (parentStep.id === 'step2') {
                seleccionExperiencia = card.getAttribute('data-value');
            }
        });
    });
    
    // Navegación de pasos
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.calc-step');
            const currentStepIndex = Array.from(calcSteps).indexOf(currentStep);
            
            // Validar que se haya seleccionado una opción en el paso actual
            if (currentStep.querySelector('.option-card.selected')) {
                // Ocultar paso actual
                currentStep.classList.remove('active');
                
                // Mostrar siguiente paso
                if (currentStepIndex < calcSteps.length - 1) {
                    calcSteps[currentStepIndex + 1].classList.add('active');
                    
                    // Si estamos pasando al paso de resultado, actualizar el resultado
                    if (calcSteps[currentStepIndex + 1].id === 'step3') {
                        actualizarResultado();
                    }
                }
            } else {
                alert('Por favor, selecciona una opción para continuar.');
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.calc-step');
            const currentStepIndex = Array.from(calcSteps).indexOf(currentStep);
            
            // Ocultar paso actual
            currentStep.classList.remove('active');
            
            // Si estamos en el paso final y queremos volver a empezar
            if (currentStep.id === 'step3') {
                // Restablecer selecciones
                optionCards.forEach(card => card.classList.remove('selected'));
                seleccionVehiculo = '';
                seleccionExperiencia = '';
                
                // Volver al primer paso
                calcSteps[0].classList.add('active');
            } 
            // Si no, volver al paso anterior
            else if (currentStepIndex > 0) {
                calcSteps[currentStepIndex - 1].classList.add('active');
            }
        });
    });
    
    // Función para actualizar el resultado según las selecciones
    function actualizarResultado() {
        const resultadoContainer = document.querySelector('.resultado-curso');
        let cursoRecomendado = '';
        let precio = '';
        let caracteristicas = [];
        
        // Lógica simplificada para determinar el curso recomendado
        if (seleccionVehiculo === 'auto') {
            cursoRecomendado = 'Licencia B1 - Curso Completo';
            
            if (seleccionExperiencia === 'ninguna') {
                precio = '$1.200.000';
                caracteristicas = [
                    '30 horas teóricas',
                    '20 horas prácticas',
                    'Material de estudio incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else if (seleccionExperiencia === 'poca') {
                precio = '$900.000';
                caracteristicas = [
                    '20 horas teóricas',
                    '15 horas prácticas',
                    'Material de estudio incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else {
                precio = '$750.000';
                caracteristicas = [
                    '15 horas teóricas',
                    '10 horas prácticas',
                    'Material de estudio incluido',
                    'Acompañamiento en examen oficial'
                ];
            }
        } else if (seleccionVehiculo === 'moto') {
            cursoRecomendado = 'Licencia A2 - Motocicletas';
            
            if (seleccionExperiencia === 'ninguna') {
                precio = '$950.000';
                caracteristicas = [
                    '25 horas teóricas',
                    '15 horas prácticas',
                    'Equipo de protección incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else if (seleccionExperiencia === 'poca') {
                precio = '$750.000';
                caracteristicas = [
                    '20 horas teóricas',
                    '10 horas prácticas',
                    'Equipo de protección incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else {
                precio = '$650.000';
                caracteristicas = [
                    '15 horas teóricas',
                    '8 horas prácticas',
                    'Equipo de protección incluido',
                    'Acompañamiento en examen oficial'
                ];
            }
        } else {
            cursoRecomendado = 'Licencia C1 - Vehículos Pesados';
            
            if (seleccionExperiencia === 'ninguna') {
                precio = '$1.500.000';
                caracteristicas = [
                    '40 horas teóricas',
                    '30 horas prácticas',
                    'Material especializado incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else if (seleccionExperiencia === 'poca') {
                precio = '$1.300.000';
                caracteristicas = [
                    '30 horas teóricas',
                    '25 horas prácticas',
                    'Material especializado incluido',
                    'Acompañamiento en examen oficial'
                ];
            } else {
                precio = '$1.100.000';
                caracteristicas = [
                    '25 horas teóricas',
                    '20 horas prácticas',
                    'Material especializado incluido',
                    'Acompañamiento en examen oficial'
                ];
            }
        }
        
        // Actualizar el HTML del resultado
        resultadoContainer.querySelector('h4').textContent = cursoRecomendado;
        resultadoContainer.querySelector('.precio-actual').textContent = precio;
        
        // Actualizar las características
        const ulElement = resultadoContainer.querySelector('ul');
        ulElement.innerHTML = '';
        caracteristicas.forEach(caracteristica => {
            const li = document.createElement('li');
            li.textContent = caracteristica;
            ulElement.appendChild(li);
        });
        
        // Actualizar imagen según el tipo de vehículo
        const imagenResultado = resultadoContainer.querySelector('img');
        if (seleccionVehiculo === 'auto') {
            imagenResultado.src = 'curso-b1.png';
            imagenResultado.alt = 'Curso Licencia B1';
        } else if (seleccionVehiculo === 'moto') {
            imagenResultado.src = 'curso-a2.png';
            imagenResultado.alt = 'Curso Licencia A2';
        } else {
            imagenResultado.src = 'curso-c1.png';
            imagenResultado.alt = 'Curso Licencia C1';
        }
    }
}

// Quiz interactivo
function initQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizNextButtons = document.querySelectorAll('.btn-quiz-next');
    const quizResult = document.getElementById('quizResult');
    const quizScore = document.getElementById('quiz-score');
    const btnRestartQuiz = document.querySelector('.btn-restart-quiz');
    
    let currentQuestion = 0;
    let score = 0;
    
    // Selección de opciones
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Desactivar todas las opciones de la misma pregunta
            const parentQuestion = option.closest('.quiz-question');
            parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Activar opción seleccionada
            option.classList.add('selected');
        });
    });
    
    // Navegación de preguntas
    quizNextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentQuizQuestion = quizQuestions[currentQuestion];
            const selectedOption = currentQuizQuestion.querySelector('.quiz-option.selected');
            
            // Validar que se haya seleccionado una opción
            if (selectedOption) {
                // Verificar si la respuesta es correcta
                if (selectedOption.getAttribute('data-correct') === 'true') {
                    selectedOption.classList.add('correct');
                    score++;
                } else {
                    selectedOption.classList.add('incorrect');
                    
                    // Mostrar cuál era la correcta
                    currentQuizQuestion.querySelector('.quiz-option[data-correct="true"]').classList.add('correct');
                }
                
                // Deshabilitar todas las opciones
                currentQuizQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });
                
                // Esperar un momento para mostrar la siguiente pregunta o resultado
                setTimeout(() => {
                    currentQuizQuestion.classList.remove('active');
                    
                    // If it's the last question's button, show result
                    if (button.textContent === 'Ver resultado') {
                         quizResult.style.display = 'block';
                         quizScore.textContent = `${score}/${quizQuestions.length}`;
                        
                         // Personalizar mensaje según puntuación
                         const resultMessage = quizResult.querySelector('.result-message');
                         if (score === quizQuestions.length) {
                             resultMessage.textContent = '¡Excelente! Tienes un gran conocimiento de las normas de tránsito. ¡En nuestros cursos aprenderás mucho más!';
                         } else if (score >= quizQuestions.length / 2) {
                             resultMessage.textContent = 'Buen trabajo, pero aún hay espacio para mejorar. Nuestros cursos te ayudarán a perfeccionar tus conocimientos.';
                         } else {
                             resultMessage.textContent = 'Parece que necesitas reforzar tus conocimientos sobre normas de tránsito. ¡Nuestros cursos son perfectos para ti!';
                         }

                    }
                    // If there are more questions, show the next one
                    else if (currentQuestion < quizQuestions.length - 1) {
                        currentQuestion++;
                        quizQuestions[currentQuestion].classList.add('active');
                    }
                   
                }, 1500);
            } else {
                alert('Por favor, selecciona una respuesta para continuar.');
            }
        });
    });
    
    // Reiniciar quiz
    btnRestartQuiz.addEventListener('click', () => {
        // Restablecer puntuación
        currentQuestion = 0;
        score = 0;
        
        // Ocultar resultado
        quizResult.style.display = 'none';
        
        // Restablecer all questions
        quizQuestions.forEach((question, index) => {
            // Remove correct/incorrect classes
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
                opt.style.pointerEvents = 'auto'; // Re-enable clicks
            });
            
            // Show only the first question
            if (index === 0) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    });
}

// Countdown timer
function initCountdown() {
    // Establecer fecha objetivo (3 días a partir de ahora)
    const now = new Date();
    const targetDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    
    function updateCountdown() {
        const currentTime = new Date();
        const difference = targetDate - currentTime;
        
        // Stop the countdown if the target date is reached
        if (difference < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-timer').innerHTML = '<span class="timer-label">¡Oferta terminada!</span>';
            return;
        }

        // Calcular días, horas, minutos y segundos restantes
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Actualizar el DOM
        document.getElementById('days').innerHTML = days < 10 ? '0' + days : days; 
        document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours; 
        document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes; 
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds; 
    }
    
    // Actualizar el countdown cada segundo
    updateCountdown(); 
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Video players (Testimonial video and slider videos)
function initVideoPlayers() {
    // Function to handle playing a video within a container
    function setupVideoPlayer(container) {
         const playButton = container.querySelector('.play-button');
         const videoThumb = container.querySelector('.video-thumb');
         const videoUrl = playButton.getAttribute('data-video-url');

         if (!playButton || !videoThumb || !videoUrl) return; 

        playButton.addEventListener('click', () => {
             const iframe = document.createElement('iframe');
             iframe.width = '100%';
             iframe.height = '100%';
             iframe.src = videoUrl;
             iframe.frameBorder = '0';
             iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
             iframe.allowFullscreen = true;
            
             // Replace the thumbnail/play button with the iframe
             container.innerHTML = ''; 
             container.appendChild(iframe);
         });
     }

     // Setup the testimonial video player
     const testimonialVideoContainer = document.querySelector('.testimonios-video .video-container');
     if(testimonialVideoContainer) {
         setupVideoPlayer(testimonialVideoContainer);
     }

     // Setup video players within the novedades slider slides
     document.querySelectorAll('.novedades-slider .video-item .play-button').forEach(playBtn => {
         const container = playBtn.closest('.video-container');
         if(container) {
             setupVideoPlayer(container);
         }
     });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('form-contacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            let isValid = true;
            
            // Validar nombre
            const nombreInput = document.getElementById('nombre');
            if (!nombreInput.value.trim()) {
                setInvalid(nombreInput, 'Por favor, ingresa tu nombre completo');
                isValid = false;
            } else {
                setValid(nombreInput);
            }
            
            // Validar email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                setInvalid(emailInput, 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            } else {
                setValid(emailInput);
            }
            
            // Validar teléfono
            const telefonoInput = document.getElementById('telefono');
            if (!telefonoInput.value.trim()) {
                setInvalid(telefonoInput, 'Por favor, ingresa tu número de teléfono');
                isValid = false;
            } else {
                setValid(telefonoInput);
            }
            
            // Validar mensaje
            const mensajeInput = document.getElementById('mensaje');
            if (!mensajeInput.value.trim()) {
                setInvalid(mensajeInput, 'Por favor, ingresa tu mensaje');
                isValid = false;
            } else {
                setValid(mensajeInput);
            }
            
            // Validar términos
            const terminosInput = document.getElementById('terminos');
            if (!terminosInput.checked) {
                setInvalid(terminosInput, 'Debes aceptar la política de privacidad');
                isValid = false;
            } else {
                setValid(terminosInput);
            }
            
            // Si el formulario es válido
            if (isValid) {
                // Simulación de envío (aquí iría el código para enviar el formulario)
                contactForm.querySelector('.btn-form').disabled = true;
                contactForm.querySelector('.btn-form').textContent = 'Enviando...';
                
                // Simulación de respuesta exitosa
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('invalid');
                    });
                    
                    contactForm.querySelector('.form-success').style.display = 'block';
                    contactForm.querySelector('.btn-form').style.display = 'none';
                    
                    // Después de un tiempo, restablecer el formulario
                    setTimeout(() => {
                        contactForm.querySelector('.form-success').style.display = 'none';
                        contactForm.querySelector('.btn-form').style.display = 'block';
                        contactForm.querySelector('.btn-form').disabled = false;
                        contactForm.querySelector('.btn-form').textContent = 'Enviar mensaje';
                    }, 5000);
                }, 2000);
            }
        });
        
        // Funciones auxiliares para validación
        function setInvalid(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('invalid');
            formGroup.querySelector('.form-error').textContent = message;
        }
        
        function setValid(input) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('invalid');
        }
    }
}