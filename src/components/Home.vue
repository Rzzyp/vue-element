<template>
    <div>
        Home组件
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="css" scoped>

</style>