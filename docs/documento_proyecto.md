# Sistema de Publicaciones Universitarias

Para este proyecto, se ha implementado una página principal, por la cual el usuario pude registrar una cuenta o, en el caso de que ya esté registrado, hacer login a su cuenta.

En cuanto al registro, el usuario ha de introducir su nombre, apellidos, un email válido y único (no puede haber dos usuarios con el mismo correo electrónico) y una contraseña. Una vez que el usuario se halla registrado correctamente, se le redigirá a la página de login para que pueda acceder a su cuenta.

Al acceder a su cuenta, cada usuario puede ver sus publicaciones, crear nuevas, editarlas, eliminarlas o incluso, cerrar sesión. Otros usuarios no pueden interferir en las notas de otros, solo puede intervenir en las suyas propias, gracias a los métodos de autenticación y JWT Tokens.

## Diagrama de la Arquitectura

