<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: String,
      default: '0'
    },
    zIndex: {
      type: String,
      default: '1'
    },
    className: {
      type: String,
      default: ''
    },
      fixedDom:{
          type: String,
          default: ''
      }
  },
  data() {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    document.getElementById(this.fixedDom).addEventListener('scroll', this.handleScroll,true)
      document.getElementById(this.fixedDom).addEventListener('resize', this.handleReize,true)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
      document.getElementById(this.fixedDom).removeEventListener('scroll', this.handleScroll)
      document.getElementById(this.fixedDom).removeEventListener('resize', this.handleReize)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
        this.$emit('topShow',true)
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
        this.$emit('topShow',false)
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    },
    handleReize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>
