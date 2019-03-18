---
type: post
title: Paradigmas y algo de funcional
date: 2018/02/16
language: es
---

Al principio, cuando empecé a programar, estaba feliz con que mi programa funcione como esperaba, o pueda entender algo de lo que copiaba y pegaba. Todavía me acuerdo de los primeros programas que hice sacando código de algunos blogs que encontraba por internet. Quizás no entendía del todo lo que hacía ese choclo de código que tenía en mi .bat, pero estaba bastante satisfecho con el resultado.

![](https://cdn-images-1.medium.com/max/2000/1*tG5k9K7ThS-HUJ9N0ns1QQ.jpeg)

Mi situación actual es un poco diferente, al avanzar empecé a hacer programas más complejos y también trabajé con otras personas que tienen que entender lo que escribo. Por eso es que ahora no solo me importa que las cosas que hago funcionen, sino que se puedan entender y se puedan modificar fácilmente también.

## La comunicación

Primero me gustaría empezar por definir algunas palabras que vamos a usar frecuentemente cuando hablemos de código. Si ya conocen el significado de expresividad, abstracción y declaratividad pueden saltearse esta sección.

Tanto para otras personas como para el “Yo futuro”, es fundamental que aprendamos a comunicarnos bien. Para eso contamos con algunas palabras que encapsulan conceptos que podemos querer transmitirles a otros.

Solo les voy a introducir rápidamente 3 palabras que van a ser muy frecuentes cuando empecemos a hablar de cómo escribir código y que estaría bueno que usen en su día a día.

* **[Expresividad](http://wiki.uqbar.org/wiki/articles/expresividad.html):** Un concepto subjetivo, vamos a decir que un código es más expresivo que otro si podemos entender su “intención” de forma más rápida.

* **[Abstracción](http://wiki.uqbar.org/wiki/articles/abstraccion.html):** Me permite separar los conceptos que considero importantes en ese momento, de los accesorios. Permitiéndome ver un problema en partes, haciendo su entendimiento más sencillo.

* **[Declaratividad](http://wiki.uqbar.org/wiki/articles/declaratividad.html):** separar el “qué” del “cómo”. O sea tener código basado en definiciones más que implementaciones. Podríamos decir también que forzamos la separación entre el conocimiento del dominio y su manipulación.

Dejemos más claras estas definiciones analizando algo de código:

`gist:NormanPerrin/658999c8c5b73c3301e64416d198a082`

Empezando por la **expresividad**, como dijimos, es depende quién lo mire. O sea, si nunca vi un *map…* y la verdad que me va a resultar raro el ejemplo 1, en cambio si vengo del mundo imperativo donde el* for(let i…)* lo repito mientras duermo, va a ser más fácil de leer. Sabiendo las 2 formas, me parece más fácil de leer la primera, en el segundo ejemplo tengo que ver qué hace con el array. Aunque con el nombre puedo suponer que hace un recorrido el for, después tengo que ver de qué forma va incrementando, también para asegurarme de que funcione correctamente.

Analizando las **abstracciones** de cada uno, el primer ejemplo define una para preocuparnos de la implementación de doble en otro lado. Además dentro de mapearDoble1 usa map para recorrer el array, abstrayéndose de cómo lo recorre y pasándole solamente la función de mapeo. No solamente me despreocupo de la implementación de las otras funciones cuando tengo abtrastracciones, sino que ahora el código está más desacomplado también, lo que nos da más flexibilidad para cambios y reutilización.

Finalmente podemos decir que el ejemplo 1 es más **declarativo** que el 2, al tener código basado más en definiciones que algoritmia. Esto se puede ver cuando se lee la firma de una función. Quizás se lee mejor que es una “definición” con una notación del estilo:

`gist:NormanPerrin/42f2ab0e60ef9cc9dc0f83d481ebe96b`

Esto se lee, doble es una función que recibe un número y devuelve el resultado de multiplicarlo por 2.

## Usando el paradigma funcional

Con lo que vimos ya hay ciertas reglas generales que podríamos empezar a aplicar:

* Elegir buenos nombres para las variables que escribamos (expresividad)

* Hacer código modular separando problemas (implementar buenas abstracciones)

* Intentar escribir un programa basado en definiciones más que implementaciones (declaratividad).

Pero se nos podrían ocurrir otras reglas o restricciones para generar “mejor” código. Ahí es donde entran en juego los paradigmas de programación, que nos da ciertos conceptos estandarizados y conocidos con las cuales trabajar.

Vale aclarar que el uso de un paradigma no es excluyente del uso de otro, muchas veces se suelen mezclar conceptos de paradigmas, o se aplican en parte según lo que le sirva a las personas que trabajen con el mismo.

Veamos un par de reglas del paradigma y los beneficios que nos puede traer.

### [Transparencia referencial](http://wiki.uqbar.org/wiki/articles/transparencia-referencial--efecto-de-lado-y-asignacion-destructiva.html)
> Existe transparencia referencial en una función cuando la misma puede ser reemplazada por el valor que genera, según sus parámetros de entrada.

O sea que no vamos a modificar el contexto en el que se ejecuta ni tampoco va a depender del contexto, solo de sus entradas, por lo que nunca podríamos generar 2 salidas diferentes con una misma serie de entradas.

Aplicando bien este concepto obtenemos una función más:

* **Predecible**, no dependemos más de las asunciones que haya hecho el programador del contexto cuando creó esa función.

* **Testeable**, ahora no hace falta que recreemos el contexto de ejecución de una función para probarla, solo hay que pasarle una serie de parámetros y esperar un resultado.

Veamos un ejemplo para entender mejor qué beneficios puede traer.

`gist:NormanPerrin/738f80891240a4336abe0ff7ceb8fd9e`

En este ejemplo podemos ver que no se está cumpliendo la transparencia referencial: *.serComido* genera cambios en *unaPersona* y en sí mismo, además como tiene estado interno **que puede cambiar**, su ejecución depende de cómo se encuentre en ese momento. Es importante remarcar que las funciones que modifican el estado de un objeto, hacen impredecible los valores de las siguientes ejecuciones si no se tuvieron en cuenta, o sea que el problema no es que tenga estado interno, sino que este pueda cambiar sin que nos demos cuenta.

Todo esto lo hace menos predecible y testeable. Puede traer bugs muy fácilmente si esa misma instancia de *unaComida* o *unaPersona* se usa por accidente en distintos lugares. Un cambio en una parte del programa podría afectar muchas otras que usen esos objetos.

Además es un ejemplo muy sencillo, se pueden imaginar que en un programa mediano ya van a tener muchos cambios de estado de contexto y se puede volver complejo de manejar si no tenemos la seguridad de la transparencia referencial. Igualmente tampoco tenemos que tener todo nuestro programa “puro”, sino que podemos implementar algunas abstracciones, teniendo capas de funciones puras y quizás otra en la que se maneje el estado (es una forma).

Un buen comienzo es empezar a declarar cada entrada y salida de nuestras funciones, sin dejar ninguna entrada o salida “oculta”.

Dejo que analicen tranquilos esta comparación.

`gist:NormanPerrin/8c806ee4cf5351038a3bbb72f3e8e97a`

Para empezar, aclarar que usar class o function devolviendo un objeto no son muy diferentes, los 2 pueden tener estado interno, lo importante a tener en cuenta como restricción es no cambiar su estado interno del que fue creado.

Ahora tenemos mayor control sobre el estado de nuestros objetos, ya que no cambian, así ganamos más predictibilidad en nuestro código.

### [Orden superior](http://wiki.uqbar.org/wiki/articles/orden-superior.html)
> Cuando una función puede recibir y ejecutar internamente otra función o devolver una.

Es una muy buena herramienta para reutilizar comportamiento. Ahora podemos generar mejores abstracciones ya que lo que antes teníamos en la misma función, la podemos separar, dejando en la definición de la función solo lo constante y pasando por parámetro lo variable.

`gist:NormanPerrin/a16ee2bdd498daa8d0919f61a3bc0502`

Si vemos en el **ejemplo 2**, lo único que cambia es el criterio de filtro entre las 2 funciones que se definen, seguimos escribiendo cómo recorrer el array cuando lo podríamos abstraer. Vemos cómo lo podemos hacer haciendo uso de la función *.filter* y pasándole como parámetro el criterio de filtro.

Ganamos expresividad porque es más legible, hacemos buen uso de abtracciones obteniendo una función mucho más flexible a cambios y ganamos declaratividad ya que si vemos cada función del **ejemplo 1** son algo más parecido a definiciones que una serie de pasos. Qué más querés?

## Cerrando

Hay un montón de otros conceptos para ver, esto es solo un pantallazo de lo que es un paradigma de programación y algo de funcional, y lo bueno es que de a poco ya pueden empezarlos a aplicar. Mientras sigan investigando y probando estos conceptos en programas reales, van a darse cuenta de su utilidad y facilidad que les brinda en el desarrollo y más importante, el mantenimiento. La comunidad es genial y la industria lo está empezando a usar cada vez más. Es un muy buen momento para aprender este paradigma.

**Recursos y personas que recomiendo seguir:**

* [¡Aprende Haskell por el bien de todos!](http://aprendehaskell.es/main.html)

* [Quilombo Driven Development](https://www.youtube.com/channel/UCiAxxHXVLBwlW72EhZweX3Q)

* [The Rise and Fall of Funcional Programming](https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c)

* [Brian Lonsdorf](https://twitter.com/drboolean)

* [Eric Elliott](https://twitter.com/_ericelliott)

**Comunidades:**

* [Slack de MeetupJS](http://slack.meetupjs.com.ar) (tienen canal de funcional, no solo se habla de JS)

* [Slack Functional Programming](http://fpchat-invite.herokuapp.com)
