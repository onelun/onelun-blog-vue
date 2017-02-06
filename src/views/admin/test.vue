<template>
  <div>
    <multiselect
      :value="selected"
      :options="options"
      @inout="updateSelected">
    </multiselect>
  </div>
</template>
<script>
  import Multiselect from 'vue-multiselect';
  export default {
    components: { Multiselect },
    data () {
      return {
        selected: null,
        options: ['list', 'of', 'options']
      };
    },
    methods: {
      updateSelected (newSelected) {
        this.selected = newSelected;
      }
    }
  };
</script>
