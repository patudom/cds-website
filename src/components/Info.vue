<template>
  <div
    class="info-root"
  >
  <v-toolbar
    color="primary"
    dense
    class="text-uppercase toolbar"
  >
    <v-spacer></v-spacer>
    <v-toolbar-title>Why Cosmic Data Stories?</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
    <v-row
      class="info-row"
    >
      <v-col cols="12">
        <p>In Cosmic Data Stories, students collect and analyze their own astronomy data. Student measurements, calculations, and responses are stored anonymously in the CosmicDS database. Creating an account will:</p>
        <ul>
          <li>Associate student data with their class cohort</li>
          <li>Allow students to view their results within the context of their class's dataset and the full participant dataset.</li>
          <li>Keep track of students' place within the data story if they aren't able to finish the story within one class period.</li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.info-row {
  margin: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.toolbar * {
  user-select: none;
  pointer-events: none;
}

li, p {
  text-align: left;
}
</style>
