/*
 * Datos operativos de El Remedio.
 * Valores en null: dato aún pendiente de confirmar (p. ej. mapa de Nuevo Centro, reservas).
 * Al rellenar un valor, la web activa sola el enlace o dato correspondiente
 * y retira el aviso "por confirmar". No inventar valores: usar solo datos reales.
 *
 * Formatos esperados:
 *   direccion, horario, telefono -> texto
 *   mapa, carta, reservas, instagram -> URL https:// completa
 *   email -> dirección de correo
 */
window.ELREMEDIO_CONFIG = {
  carta: "https://grupobotanas.last.shop/qr/t/MOSTRADOR/l/botanas-quart",
  reservas: null,
  email: "grupobotanas@gmail.com",
  redes: {
    instagram: "https://www.instagram.com/elremedio.es/"
  },
  locales: {
    quart104: {
      direccion: "C/ de Quart, 104, Extramurs, 46008 València",
      horario: "Lunes a sábado, 07:00–22:00 · Domingo, 08:00–22:00",
      telefono: "+34 963 516 760",
      mapa: "https://maps.app.goo.gl/MkTRMPKPB1xFoEUU9"
    },
    nuevoCentro: {
      direccion: "Calle Pio XII, 2, Local 59B, 46009 València",
      horario: "Lunes a sábado, 07:00–21:00 · Domingo, 08:00–21:00",
      telefono: "+34 963 516 760",
      mapa: null
    }
  }
};
