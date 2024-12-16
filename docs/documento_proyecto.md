# Sistema de Publicaciones Universitarias

Para este proyecto, se ha implementado una página principal, por la cual el usuario pude registrar una cuenta o, en el caso de que ya esté registrado, hacer login a su cuenta.

En cuanto al registro, el usuario ha de introducir su nombre, apellidos, un email válido y único (no puede haber dos usuarios con el mismo correo electrónico) y una contraseña. Una vez que el usuario se halla registrado correctamente, se le redigirá a la página de login para que pueda acceder a su cuenta.

Al acceder a su cuenta, cada usuario puede ver sus publicaciones, crear nuevas, editarlas, eliminarlas o incluso, cerrar sesión. Otros usuarios no pueden interferir en las notas de otros, solo puede intervenir en las suyas propias, gracias a los métodos de autenticación y JWT Tokens.

Los usuarios que ya han echo login buscar y ver otras publicaciones hechas por otros usuarios en la barra de navegación.

## Diagrama de la Arquitectura

![Ver Imagen](https://www.planttext.com/plantuml/svg/TPD1RiGW34LFm1qG-_G8rLoWqgXIktSJDqDBO0GaQJNAtKiCGo79iCZY-Tl-DkJaF5W_3egnAxJVq2CNxn9d9_YDyN0oLV1hHf_vUbe5pl41fER45bQdN4Df2UeW1wqrrl4D_JJ6eztI0PqBvNPg3PFimKkJkw_VZOFnGycMH8MBc0zADMMSLr6DSncjWvCyYXuP61tQNMUXJ2-rg6iAYxrqONwngvO4KdVuaxCOxJitUWsNWwbJr9EStvOCgc4BJXvNKDOxapZMox1rUPRwxfTIzRKHEGJRNgAiRF5YEbILvVE_mypUtFeagZpPTGfdiFMyCFeB2UzTxHGomrWixeOtpJClSYjCLXYzV0BHIGHFwUbJ89BxotuiA7RzK4IBVnYb-sDfZ8nBa4mM98vKaZGPOoVKNVZF_m00)