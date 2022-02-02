<template>

  <div id="app">
    <div class="fixed_wrap">
      <MyHeader/>
    </div>

    <div class="contains">
      <router-view/>
    </div>


    <MyFooter/>
  </div>
</template>


<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
export default {
  components: {MyHeader,MyFooter}
}



</script>

<style>
.fixed_wrap {
  height: 90px;
}

.contains{
  min-height: 900px;
}

</style>