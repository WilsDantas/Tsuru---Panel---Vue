<template>
    <div>
        <Nav-Component/>
        <router-view class="container"></router-view>
    </div>
</template>

<script>

import NavComponent from './_partials/nav'
export default {
    components: {
        NavComponent
    }
}
</script>

<style src="../assets/css/style.scss"  lang="scss">