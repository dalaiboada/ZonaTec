## Paso 1: El código HTML y JavaScript

Crea un archivo llamado `index.html` y pega este código. Está diseñado para ser limpio, moderno y fácil de entender.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto</title>
    <style>
        /* Un diseño básico y limpio para que no se vea feo */
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 50px auto; padding: 20px; }
        .campo { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { background-color: #007BFF; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
        button:hover { background-color: #0056b3; }
        #estado { margin-top: 15px; font-weight: bold; text-align: center; }
        .exito { color: green; }
        .error { color: red; }
    </style>
</head>
<body>

    <h2>Contáctame</h2>
  
    <form id="miFormulario" action="https://formspree.io/f/tu_id_formspree" method="POST">
        <div class="campo">
            <label for="correo">Tu Correo Electrónico:</label>
            <input type="email" id="correo" name="email" required placeholder="ejemplo@correo.com">
        </div>
      
        <div class="campo">
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="message" rows="5" required placeholder="Escribe tu mensaje aquí..."></textarea>
        </div>
      
        <button type="submit" id="botonEnviar">Enviar Mensaje</button>
    </form>

    <div id="estado"></div>

    <script>
        const formulario = document.getElementById('miFormulario');
        const estado = document.getElementById('estado');
        const boton = document.getElementById('botonEnviar');

        formulario.addEventListener('submit', async function(evento) {
            // 1. Evitamos que la página se recargue al enviar
            evento.preventDefault(); 
          
            // 2. Cambiamos el texto del botón para que el usuario sepa que está cargando
            boton.innerText = "Enviando...";
            boton.disabled = true;

            // 3. Recogemos los datos del formulario
            const datos = new FormData(formulario);

            // 4. Enviamos los datos a Formspree usando JavaScript (Fetch)
            try {
                const respuesta = await fetch(formulario.action, {
                    method: formulario.method,
                    body: datos,
                    headers: { 'Accept': 'application/json' }
                });

                if (respuesta.ok) {
                    // Si todo sale bien
                    estado.innerHTML = "¡Mensaje enviado con éxito! Te responderé pronto.";
                    estado.className = "exito";
                    formulario.reset(); // Limpia los campos del formulario
                } else {
                    // Si el servidor responde con un error
                    estado.innerHTML = "Hubo un problema al enviar. Inténtalo de nuevo.";
                    estado.className = "error";
                }
            } catch (error) {
                // Si hay un error de conexión a internet
                estado.innerHTML = "Error de conexión. Revisa tu internet.";
                estado.className = "error";
            } finally {
                // Restauramos el botón a su estado original
                boton.innerText = "Enviar Mensaje";
                boton.disabled = false;
            }
        });
    </script>

</body>
</html>

```

---

## Paso 2: Conectarlo a tu correo (En 2 minutos)

Para que los mensajes realmente lleguen a tu bandeja de entrada, haz lo siguiente:

1. Entra en [Formspree.io](https://formspree.io/) y regístrate gratis con tu correo electrónico (el mismo donde quieres recibir los mensajes).
2. Haz clic en **"New Form"** (Nuevo formulario).
3. Ponle un nombre (por ejemplo: "Contacto Web") y asegúrate de que esté vinculado a tu correo.
4. Formspree te dará un enlace que se ve así: `https://formspree.io/f/xyzkjwn`.
5. Copia ese enlace y pégalo en tu código HTML, justo donde dice `action="https://formspree.io/f/tu_id_formspree"`.
