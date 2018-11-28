<template>
  <section>
    <div>
      <img :src="qrsrc" alt="">
    </div>
      <canvas id="canvas" style="display:none"></canvas>
      <canvas id="img" style="display:none"></canvas>
  </section>

</template>

<script>



export default {
  data(){
    return {
        $url:'',
        qrsrc:'',
    }
  },
  mounted(){
      let urls = window.location.href.split('=')[1];
      this.$url = decodeURIComponent(decodeURIComponent(urls));
      console.log(decodeURIComponent(decodeURIComponent(urls)))
      this.genqr(this.$url)
  },
    methods:{
        genqr(url){
            var canvas = document.getElementById('canvas');
            this.QRCode.toCanvas(canvas, url,{ errorCorrectionLevel: 'H' }, function (error) {
                if (error){} else{}
            })
            var context=canvas.getContext('2d');
            var imageData = context.getImageData(0,0,canvas.width,canvas.height);

            var img = document.getElementById("img");
            img.width=canvas.width
            img.height=canvas.height
            var context2 = img.getContext('2d');
            context2.fillStyle="white";
            context2.fillRect(0,0,canvas.width,(canvas.height));
            context2.putImageData(imageData,0,0);
            context2.font="bold 10px 微软雅黑"
            context2.fillStyle="black"
            var url = img.toDataURL("image/png");
            this.qrsrc = url;
        },
    },
  activated(){

	},
  watch:{

  }

}

</script>

<style>


</style>