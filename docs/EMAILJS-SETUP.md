# 📧 EmailJS Setup for Contact Form

## 🚀 Steps to Configure EmailJS (FREE)

### 1. **Create EmailJS Account**

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for free (allows up to 200 emails/month)
3. Confirm your email

### 2. **Configurar Servicio de Email**

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Elige tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** (lo necesitarás después)

### 3. **Crear Template de Email**

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este template básico:

```
Subject: Nuevo mensaje de contacto: {{subject}}

De: {{from_name}}
Email: {{from_email}}

Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portfolio web.
```

4. **Variables disponibles en el template:**

   - `{{from_name}}` - Nombre del usuario
   - `{{from_email}}` - Email del usuario
   - `{{subject}}` - Asunto del mensaje
   - `{{message}}` - Mensaje del usuario
   - `{{to_name}}` - Tu nombre (Marcos Echague)
   - `{{reply_to}}` - Email para responder

5. **Copia el Template ID**

### 4. **Obtener Public Key**

1. Ve a **"Account"** > **"General"**
2. Copia tu **Public Key**

### 5. **Configurar Variables de Entorno**

Edita el archivo `.env.local` en tu proyecto:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

### 6. **Probar el Formulario**

1. Ejecuta `npm run dev`
2. Ve a la sección Contact de tu portfolio
3. Llena el formulario y envía un mensaje de prueba
4. Revisa tu email para confirmar que funciona

## 🔒 **Configuración Avanzada (Opcional)**

### Filtros de Spam

En EmailJS puedes configurar filtros para evitar spam:

1. Ve a **"Email Templates"** > tu template > **"Settings"**
2. Habilita **"Captcha"** o **"Template Guard"**

### Límites

- **Gratis**: 200 emails/mes
- **Personal ($15/mes)**: 1,000 emails/mes
- **Team ($50/mes)**: 10,000 emails/mes

## 🐛 **Troubleshooting**

### Error "EmailJS configuration missing"

- Verifica que las variables de entorno están bien configuradas
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error 403 o 400

- Verifica que el Service ID, Template ID y Public Key son correctos
- Asegúrate de que el servicio de email está activo

### No llegan los emails

- Revisa la carpeta de spam
- Verifica que el template está configurado correctamente
- Comprueba que el servicio de email está conectado

## 🎯 **Template de Email Recomendado**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Nuevo Contacto - Portfolio</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2
        style="color: #00ff88; border-bottom: 2px solid #00ff88; padding-bottom: 10px;"
      >
        📧 Nuevo Mensaje de Contacto
      </h2>

      <div
        style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="color: #0284c7; margin-top: 0;">
          Información del Contacto:
        </h3>
        <p><strong>Nombre:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Asunto:</strong> {{subject}}</p>
      </div>

      <div
        style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;"
      >
        <h3 style="color: #0284c7; margin-top: 0;">Mensaje:</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
      </div>

      <div
        style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;"
      >
        <p>Este mensaje fue enviado desde tu portfolio web el {{date}}.</p>
        <p>Para responder, simplemente contesta a este email.</p>
      </div>
    </div>
  </body>
</html>
```

Una vez configurado, tu formulario de contacto estará 100% funcional y recibirás emails reales! 🚀
