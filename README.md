# 🏍️ MOTO PARTES · Gestor de Cuentas

Sistema de gestión y cuadre de cuentas bancarias diseñado para MIPYMEs cubanas. Permite controlar entradas, salidas y transferencias entre múltiples cuentas en diferentes monedas (CUP, USD, MLC, EUR), con reportes automáticos y funcionamiento 100% offline.

![Windows](https://img.shields.io/badge/plataforma-Windows%2010%2B-blue)
![Python](https://img.shields.io/badge/Python-3.10%2B-green)
![Licencia](https://img.shields.io/badge/licencia-MIT-yellow)
![Estado](https://img.shields.io/badge/estado-activo-brightgreen)

---

## 📋 Descripción

**MOTO PARTES** es una aplicación de escritorio nativa para Windows que permite a pequeñas y medianas empresas gestionar sus cuentas bancarias de forma centralizada. Fue desarrollada específicamente para el contexto cubano, donde las empresas manejan múltiples tarjetas y cuentas en distintas monedas simultáneamente.

### Problema que resuelve

- ❌ Llevar el control de cuentas en hojas de cálculo dispersas
- ❌ No saber el saldo real de cada cuenta en tiempo real
- ❌ Dificultad para conciliar movimientos entre tarjetas
- ❌ Pérdida de información al cambiar de PC
- ❌ Dependencia de conexión a internet

### Lo que ofrece

- ✅ Control centralizado de hasta N cuentas y monedas
- ✅ Registro de entradas, salidas y transferencias
- ✅ Cuadre mensual automático por cuenta
- ✅ Reportes exportables (Excel, PDF, JSON)
- ✅ Base de datos local con autoguardado
- ✅ Migración sencilla entre PCs (exportar/importar `.db`)
- ✅ Funcionamiento 100% offline

---

## ✨ Características

| Módulo | Descripción |
|--------|-------------|
| 📊 **Dashboard** | Resumen por categorías con saldos actuales, tendencias y desglose por periodo (mes, trimestre, año) |
| 📝 **Movimientos** | Registro completo de entradas, salidas y transferencias con filtros y búsqueda |
| 📅 **Cuadre Mensual** | Evolución mensual por cuenta con mini-gráficos y comparativas |
| 🏦 **Cuentas** | Gestión de cuentas bancarias y monedas con saldos iniciales |
| 🏷️ **Categorías** | Clasificación personalizada de movimientos por colores |
| 💾 **Persistencia** | Autoguardado automático cada 2 segundos tras cualquier cambio |
| 📤 **Exportaciones** | Excel, PDF, JSON y archivo `.db` portable |
| 🌙 **Tema oscuro** | Interfaz adaptable (claro/oscuro) |

---

## 🛠️ Tecnologías

### Frontend
- **HTML5 + JavaScript Vanilla** (sin frameworks pesados)
- **Tailwind CSS** (estilos)
- **Chart.js** (visualizaciones)
- **SheetJS / XLSX** (exportación Excel)
- **jsPDF + AutoTable** (exportación PDF)
- **sql.js** (SQLite compilado a WebAssembly)

### Backend / Empaquetado
- **Python 3.10+**
- **PyWebView** (ventana nativa de escritorio)
- **PyInstaller** (compilación a `.exe` autónomo)
- **SQLite** (base de datos relacional embebida)

---

## 📁 Estructura del proyecto
mipyme-app/
├── index.html # Aplicación principal (SPA)
├── app.py # Servidor local + API de archivos (Python)
├── manifest.json # Configuración PWA
├── sw.js # Service Worker (opcional)
├── logo.png # Logo de la aplicación
├── icono.ico # Icono del ejecutable
├── crear_exe.bat # Compila el .exe final
├── probar_app.bat # Ejecuta en modo desarrollo
├── descargar_libs.bat # Descarga las librerías offline
├── libs/ # Librerías JS locales (offline)
│ ├── tailwind.js
│ ├── chart.js
│ ├── xlsx.js
│ ├── jspdf.js
│ ├── jspdf_autotable.js
│ ├── sql-wasm.js
│ └── sql-wasm.wasm
├── icons/ # Iconos PWA
│ ├── icon-192.png
│ └── icon-512.png
└── dist/ # .exe compilado (se genera)
└── MOTO PARTES.exe

---

## 🚀 Instalación y compilación

### Requisitos previos

- Windows 10 versión 2004 o superior
- [Python 3.10+](https://www.python.org/downloads/) instalado y en el PATH
- Conexión a internet (solo para la primera instalación)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/moto-partes.git
cd moto-partes

Paso 2: Instalar dependencias de Python
bash
1 pip install pywebview pyinstaller
Paso 3: Descargar librerías offline (solo la primera vez)
bash
1 descargar_libs.bat
Esto descargará Tailwind, Chart.js, XLSX, jsPDF y sql.js en la carpeta libs/.
Paso 4: Probar en modo desarrollo
bash
1 probar_app.bat
Se abrirá una consola visible (útil para depurar) y la ventana de la aplicación.
Paso 5: Compilar el ejecutable
bash
1 crear_exe.bat
El archivo MOTO PARTES.exe se generará en la carpeta dist/.

💻 Uso
Primer arranque
Al abrir la app por primera vez, se crea automáticamente una base de datos con 7 cuentas de ejemplo y 6 categorías predefinidas. Puedes editarlas o eliminarlas desde el menú Cuentas y Categorías.
Ubicación de los datos
Elemento
Ruta
Base de datos
C:\Users\[Usuario]\Documents\MOTO_PARTES\database.db
Exportaciones
C:\Users\[Usuario]\Documents\MOTO_PARTES\exportaciones\
Migrar a otra PC
En la PC origen: clic en 📤 Exportar BD (.db)
Copiar el archivo .db a la PC destino (pendrive, red, etc.)
En la PC destino: clic en 📥 Cargar BD (.db) y seleccionar el archivo
Nota: La PC destino solo necesita el .exe y WebView2 Runtime (incluido por defecto en Windows 10 2004+).
🗄️ Esquema de base de datos
La app usa SQLite con las siguientes tablas:
Tabla
Propósito
accounts
Cuentas bancarias (nombre, moneda, tipo, saldo inicial)
currencies
Monedas disponibles (CUP, USD, MLC, EUR, ...)
categories
Categorías de movimientos con color
movements
Entradas, salidas y transferencias
settings
Configuración general (clave-valor)
🔒 Seguridad y privacidad
✅ Todos los datos se almacenan localmente en tu PC
✅ No se envía información a ningún servidor externo
✅ Funciona completamente sin internet
✅ La base de datos es un archivo .db estándar de SQLite (auditable)
🐛 Solución de problemas
Problema
Solución
La app no abre
Instalar WebView2 Runtime
Error de certificado al compilar
Verificar que Python esté en el PATH: python --version
Las exportaciones no aparecen
Revisar Documents\MOTO_PARTES\exportaciones\
La BD no carga
Verificar que existe Documents\MOTO_PARTES\database.db
📄 Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
👨‍💻 Autor
Desarrollado para la gestión interna de MOTO PARTES, MIPYME dedicada a la venta de piezas de motocicletas en Cuba.
Rol: Órgano de Control y Fiscalización Interno
Propósito: Cumplimiento normativo y control financiero
🙏 Agradecimientos
PyWebView · Ventanas nativas multiplataforma
sql.js · SQLite en JavaScript
SheetJS · Manipulación de Excel
jsPDF · Generación de PDF
Tailwind CSS · Framework de estilos
📌 Roadmap
Autenticación por usuario
Conciliación bancaria automática
Gráficos comparativos anuales
Soporte para tasas de cambio actualizables
Respaldos programados automáticos
<div align="center">
<sub>Hecho con ❤️ para las MIPYMEs cubanas</sub>
</div>

---

## 📝 Instrucciones para subirlo a GitHub

### Opción 1: Desde la web de GitHub
1. Ve a https://github.com/new
2. Pon el nombre del repositorio: `moto-partes`
3. Marca **"Add a README file"** (o sube este archivo después)
4. Crea el repositorio
5. Sube todos los archivos de tu carpeta `mipyme-app`

### Opción 2: Desde la terminal (si tienes Git)
```bash
cd C:\Users\RHC\Desktop\mipyme-app
git init
git add .
git commit -m "Primer commit: MOTO PARTES Gestor de Cuentas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/moto-partes.git
git push -u origin main

