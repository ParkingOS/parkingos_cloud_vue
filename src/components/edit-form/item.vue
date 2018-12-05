<template>
    <el-form-item :rules="Rules" :label="item.label" :prop="item.prop" :class="{'block':item.block}">

        <el-input v-if="item.type==='input'" v-bind="$attrs" v-on="$listeners" :type="item.subtype" :placeholder="item.placeholder" :disabled="item.disable" :readonly="item.readonly" :autosize="item.autosize" :size="item.size"></el-input>

        <el-input v-else-if="item.type==='textarea'" v-bind="$attrs" v-on="$listeners" :type="item.subtype" :rows="item.rows" :placeholder="item.placeholder" :disabled="item.disable" :readonly="item.readonly" :autosize="item.autosize" :size="item.size"></el-input>
        <!--<input-number v-else-if="item.type==='number'" v-bind="$attrs" v-on="$listeners" :min="item.min" :max="item.max" :decimal1="item.decimal1" :append="item.append" :prepend="item.prepend" :disabled="item.disabled"></input-number>-->

        <!--<el-checkbox v-else-if="item.type==='switch' && item.appearance==='checkbox'" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled"></el-checkbox>-->
        <!--<el-switch v-else-if="item.type==='switch'" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled"></el-switch>-->

        <!--<el-rate v-else-if="item.type==='rate'" v-bind="$attrs" v-on="$listeners" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" text-color="#ff9900"></el-rate>-->

        <!--<el-color-picker v-else-if="item.type==='color'" v-bind="$attrs" v-on="$listeners" :show-alpha="item.showAlpha" :color-format="item.format"></el-color-picker>-->

        <!--<el-slider v-else-if="item.type==='slider'" v-bind="$attrs" v-on="$listeners" :range="item.isRange" :show-stops="item.showStops" :step="item.step" :min="item.min" :max="item.max"></el-slider>-->

        <el-radio-group v-else-if="item.type==='radio'" v-bind="$attrs" v-on="$listeners" :size="item.size">
            <component :is="item.button?'el-radio-button':'el-radio'" v-for="o in item.options||ajaxOptions" :key='o.value_no' :label="o.value_no" :disabled="o.disabled" :border="item.border">{{o.value_name}}</component>
        </el-radio-group>

        <!--<el-checkbox-group v-else-if="item.type==='checkbox'" :min="item.min" :max="item.max" v-bind="$attrs" v-on="$listeners">-->
            <!--<component-->
                    <!--:is="item.button?'el-checkbox-button':'el-checkbox'"-->
                    <!--v-for="o in item.options||ajaxOptions"-->
                    <!--:key='o.value'-->
                    <!--:disabled="o.disabled"-->
                    <!--:label="o.value" :border="item.border">{{o.label}}</component>-->
        <!--</el-checkbox-group>-->

        <el-select v-else-if="item.type==='select'" v-bind="$attrs" v-on="$listeners" :multiple="item.multiple" :disabled="item.disabled" :multiple-limit="item.multipleLimit" :size="item.size" :style="{width:'100%'}">
            <el-option v-for="o in item.options||ajaxOptions" :key="o.value_no" :label="o.value_name" :value="o.value_no" :disabled="o.disabled">
            </el-option>
        </el-select>

        <!--<el-cascader v-else-if="item.type==='cascader'" v-bind="$attrs" v-on="$listeners" :options="item.options||require('element-china-area-data')[item.areaShortcut]||ajaxOptions" :filterable="item.filterable" :disabled="item.disabled" :clearable="true"></el-cascader>-->

        <!--<el-time-picker v-else-if="item.type==='time'" :is-range="item.isRange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.valueFormat" :placeholder="item.placeholder" v-bind="$attrs" v-on="$listeners"></el-time-picker>-->

        <!--<el-date-picker v-else-if="item.type==='date'" :type="item.subtype" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.viewFormat||item.valueFormat" :placeholder="item.placeholder" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled"></el-date-picker>-->

        <!--<richtext v-else-if="item.type==='richtext'" v-bind="$attrs" v-on="$listeners"></richtext>-->

        <span v-else>未知控件类型</span>

    </el-form-item>
</template>

<script>
    export default {
        name: 'item',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                ajaxOptions: []
            }
        },
        computed: {
            Rules() {
                const rules = this.item.rules
                // console.log('rules',rules);
                if (rules === undefined) return undefined

                const R = []

                rules.forEach(rule => {
                    if (rule.sql) {
                        const validator = (rule2, value, callback) => {
                            request('/api/validate', 'POST', {
                                key: rule2.field,
                                value,
                                sql: rule.sql.replace(/{key}/ig, rule2.field)
                            })
                                .then(res => {
                                    // eslint-disable-next-line
                                    callback(!res || undefined)
                                })
                                .catch(err => {
                                    this.$message.error(err.message)
                                    // eslint-disable-next-line
                                    callback(false)
                                })
                        }

                        R.push({ validator, message: rule.message, trigger: 'blur' })
                    } else {
                        R.push(rule)
                    }
                })

                return R
            }
            // Rules() {
            //     const rules = this.item.rules
            //     if (rules === undefined) return undefined
            //     console.log('------',rules)
            //     return rules
            //
            // }
        },
    };
</script>

<style scoped>

</style>