<template>
    <section class="data-screen-wrapper">
        <header class="header" :style="headerStyle"></header>
    </section>
</template>

<script>
    export default {
        name: 'data_-screen',
        data(){
            let that = this;
            return {
                screenBg:require('@/assets/images/screen/screenBg.png'),
                headerBg:require('@/assets/images/screen/headerBg.png'),
                headerStyle:{
                    background:'url('+require('@/assets/images/screen/headerBg.png')+') no-repeat',
                    backgroundSize:'100% 100%'
                },
            }
        }
    };
</script>

<style lang="scss" scoped>
    .data-screen-wrapper{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(4,21,53,1);
        .header{
            padding: 0;
            margin: 0;
            height: 59px;
        }
    }
</style>