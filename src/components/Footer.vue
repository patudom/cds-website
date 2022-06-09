<template>
  <v-footer
    color="primary darken-4"
    app
    padless
    inset
    id="footer"
  >
    <v-row
      justify="center"
      id="info-row"
    >
      <v-col
        cols="12"
        class="d-flex justify-space-around align-center"
        id="info-row-col"
      >
        <v-spacer></v-spacer>
        <v-container
          id="address-container"
          class="d-flex flex-column flex-grow-0"
        >
          <a href="https://www.cosmicds.cfa.harvard.edu/">Cosmic Data Stories</a>
          <span>Center for Astrophysics Harvard | Smithsonian</span>
          <span>60 Garden Street</span>
          <span>Cambridge, MA  02138</span>
        </v-container>
        <v-img
          class="flex-grow-0"
          id="nasa-logo"
          :src="require(`@/assets/images/NASA_logo_svg.webp`)"
        />
        <v-img
          class="flex-grow-0"
          id="cfa-logo"
          :src="require(`@/assets/images/cfa_theme_logo_black.webp`)"
        />
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row justify="center">
      <span>
        The material contained on this website is based upon work supported by NASA under award No. 80NSSC21M0002 Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Aeronautics and Space Administration.
      </span>
      <v-container justify="center">
        <v-row class="d-flex justify-center">
          <a href="https://pweb.cfa.harvard.edu/privacy-statement">Privacy</a>
          <a href="https://accessibility.huit.harvard.edu/digital-accessibility-policy">Digital Accessibility</a>
          <a href="https://www.cosmicds.cfa.harvard.edu/contact">Contact Us</a>
        </v-row>
      </v-container>
    </v-row>
    <v-row  justify="center">
      Copyright © 2021 The President and Fellows of Harvard College.
    </v-row>
  </v-footer>
</template>

<style scoped>
#footer {
  min-height: 250px;
  box-shadow: 0px 0px 5px 1px white;
}

a {
  color: white;
  margin-left: 10px;
  margin-right: 10px;
}

#info-row .col {
  padding: 0px;
}

.row {
  padding: 0px;
}

#address-container {
  width: auto;
}

#nasa-logo {
  width: 115px;
  height: 96px;
}

#cfa-logo {
  width: 371px;
  height: 62px;
}
</style>
