<template>
    <section class="right-wrapper-size shop-table-wrapper" id="scrollBarDom">
        <div class="shop-custom-operation">
            <header class="shop-custom-header">
                <p style="float: left">增值服务<span style="margin: 2px">-</span>短信服务<span style="margin: 2px">-</span>短信分配</p>
                <div class="float-right"><el-button type="text" size="mini" @click="resetForm" icon="el-icon-refresh" style="font-size: 14px;color: #1E1E1E;">刷新</el-button></div>
            </header>
        </div>
        <div class="table-wrapper-style">
            <tab-pane
                    :stripe="true"
                    :queryapi="queryapi"
                    :orderfield="orderfield"
                    :fieldsstr="fieldsstr"
                    :exportapi="exportapi"
                    :table-items="tableitems"
                    align-pos="right"
                    :searchForm="searchForm"
                    fixedDom="scrollBarDom"
                    v-on:transferData="transferData"
                    ref="tabPane"
            ></tab-pane>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'smsDistribution'
    };
</script>

<style scoped>

</style>