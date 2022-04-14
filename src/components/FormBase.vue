<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormBase extends Vue {

  $refs!: {
    form: HTMLFormElement
  }

  validate(): boolean {
    return this.$refs.form.validate();
  }

  reset(): void {
    this.$refs.form.reset();
  }

}
</script>
