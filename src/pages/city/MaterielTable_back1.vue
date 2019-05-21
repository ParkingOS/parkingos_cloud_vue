<template>
    <section :style="{width: '100%',height:domHeight+'px'}" class="bolink-wrapper">
        <iframe width="100%" height="100%" src="http://localhost:8082/#/materiel" frameborder="0"></iframe>
    </section>
</template>
<script>
    import common from '../../common/js/common'
    export default {
        data(){
            return {
                domHeight:500,
            }
        },
        mounted(){
            let that = this;
            this.domHeight = common.gwh() - 90;
            window.addEventListener('resize', () => {
                that.domHeight = common.gwh() - 90;
            });
        }
    }
</script>
<style scoped>
    .bolink-wrapper{
        display: block;
        margin-top: 20px;
    }
</style>

