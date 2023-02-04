import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

//color theme
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.darken2, //#388E3C
        secondary: colors.amber.accent4, //#FFAB00
        accent: colors.deepPurple.accent4, //#6200EA
      },
    },
  },
});
