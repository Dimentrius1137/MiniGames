 <template>
  <div class="header">
    <div class="menu_cont">
      <div class="menu">   
        <n-menu 
          v-model:value="currentRoute"
          mode="horizontal"
          :options="menuOptions"
          responsive
        />
    </div>
    </div>
      
  </div>

  </template>
  
  <script>
  import { h } from "vue";
    import { RouterLink } from 'vue-router'
  export default {
    data() {
      return {
        activeKey: null,
        menuOptions: [
          {
            label: () => h(
            RouterLink,
            { to: "/" },
            { default: () => "snake" }
          ),
            key: "snake",
          },
          {
            label: () => h(
              RouterLink,
              { to: "/menu" },
              { default: () => "menu" }
            ),
            key: 'menu',
          },
        ],
      };
    },
    computed: {
      currentRoute(){
        return this.$route.name
      }
    },

  };
  </script>
  <style scoped lang="scss">
  .header{
    width: 100%;
    height: 42px;
    background-color: white;

  }
  .menu_cont{
    width: 100%;
    display: flex;
    justify-content: end;
  }
  .menu{
    width: auto;
  }
  </style> 