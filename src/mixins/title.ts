import { Component, Vue } from 'vue-property-decorator';

type TitleGetter = {
  call: (v: Vue) => string;
}

type TitleOrGetter = string | TitleGetter;

function getTitle(vm: Vue): string | null {
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title: TitleOrGetter | undefined = vm.title;
  if (title) {
    return typeof title === 'string'
      ? title
      : title.call(vm);
  } else {
    return null;
  }
}

@Component
export default class TitleMixin extends Vue {
  created(): void {
    const title = getTitle(this);
    if (title === null) {
      return;
    }
    if (title) {
      document.title = `CosmicDS - ${title}`;
    } else {
      document.title = "CosmicDS";
    }
  }
}
