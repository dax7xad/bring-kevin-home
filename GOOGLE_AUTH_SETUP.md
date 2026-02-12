# Autenticación con Google - Guía de Configuración

## ✅ Integración Completada

El sistema de autenticación con Google ha sido integrado en tu aplicación.

## 🔑 Configuración en Firebase Console

### Paso 1: Habilitar Google Sign-In

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **bring--kevi-n-home**
3. Ve a **Authentication** (Autenticación) en el menú lateral
4. Si no has configurado aún:
   - Haz clic en **Get Started**
   - Selecciona **Google** como proveedor
5. Si ya lo has hecho:
   - Ve a **Sign-in method**
   - Busca **Google** en la lista
   - Asegúrate de que esté **HABILITADO** (icono azul)

### Paso 2: Configurar el Dominio Autorizado

1. En la sección de **Sign-in method**, haz clic en **Google**
2. En la pestaña de configuración, verifica que tu dominio esté añadido
3. Para desarrollo local, deberías ver:
   - `localhost` ✅
   - `localhost:4200` ✅

### Paso 3: Autorizar tu Aplicación (OAuth)

Los dominios necesarios deberían configurarse automáticamente. Si necesitas agregar dominios personalizados:

1. Ve a **Project Settings** (Configuración del Proyecto)
2. Ve a la pestaña **Service Accounts**
3. Haz clic en **Admin SDK configuration snippet** (puede estar en otra ubicación según la versión)
4. Firebase debería mostrar los dominios autorizados

## 🎯 Características Implementadas

✅ **Botón de Login con Google** en la navbar
✅ **Almacenamiento de sesión** (persiste al recargar)
✅ **Avatar del usuario** con foto de perfil de Google
✅ **Mostrar nombre** del usuario autenticado
✅ **Botón de Logout** cuando está logueado
✅ **Responsive** en móviles y escritorio
✅ **Tema dark** integrado

## 📍 Dónde Están los Elementos

- **Componente:** `src/app/components/auth-button/`
- **Servicio:** `src/app/services/auth.service.ts`
- **Ubicación en UI:** Navbar (esquina superior derecha)

## 🚀 Funcionalidades

### Para el Usuario:
1. Hace clic en **"Iniciar con Google"**
2. Se abre un popup de Google
3. El usuario autentica
4. Su nombre y foto aparecen en la navbar
5. Puede hacer clic en **"Salir"** para cerrar sesión

### En los Comentarios:
El nombre del usuario autenticado se usa automáticamente en los formularios de comentarios (opcional - puedes mejorarlo más adelante).

## 🔒 Reglas de Seguridad Mejoradas

Puedes mejorar las reglas de Firestore para que solo usuarios autenticados puedan comentar:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Colección de comentarios
    match /comments/{commentId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura solo a usuarios autenticados con validaciones
      allow create: if request.auth != null
                    && request.resource.data.name is string 
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 50
                    && request.resource.data.message is string
                    && request.resource.data.message.size() >= 10
                    && request.resource.data.message.size() <= 500
                    && request.resource.data.timestamp is timestamp
                    && request.resource.data.approved is bool;
      
      allow update, delete: if false;
    }
  }
}
```

## 📱 Responsividad

En móviles, el botón se adapta automáticamente:
- En pantallas pequeñas, oculta el nombre del usuario
- Solo muestra el avatar y el icono

## 🐛 Solución de Problemas

### "Error: Popup bloqueado"
- Asegúrate de que el navegador no está bloqueando popups
- Intenta permitir popups para tu dominio

### "Error: Dominio no autorizado"
- Ve a Firebase Console
- Auth → Sign-in method → Google
- Verifica que tu dominio esté en la lista autorizada

### "La sesión no persiste"
- Las sesiones ahora se guardan en localStorage
- Si el usuario cierra el navegador, seguirá logueado
- Esto es normal y útil

## 🎨 Personalización Disponible

Puedes modificar fácilmente:
- El color del botón de Google
- El tamaño del avatar
- Los textos de los botones
- La ubicación en la navbar

---

**¡El sistema está listo para usar!** Solo asegúrate de habilitar Google Sign-In en Firebase Console.
