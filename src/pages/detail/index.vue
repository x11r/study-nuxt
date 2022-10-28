<template>
  <div class="container">
    <h1>detail</h1>
    <av-line
      :line-width="2"
      line-color="lime"
      :audio-src="media.url"
    ></av-line>
    <av-bars
      caps-color="#FFF"
      :bar-color="['#f00', '#ff0', '#0f0']"
      canv-fill-color="#000"
      :caps-height="2"
      :audio-src="media.url"
    ></av-bars>

  </div>
</template>
<script>
// import AudioVisual from 'vue-audio-visual'
export default {
  data () {
    return {
      media: {
        // url: 'https://www.ne.jp/asahi/music/myuu/wave/amairo.mp3'
        url: '/media/kiniro.mp3'
      }
    }
  }
}
</script>
<style>

h1, h2, h3 {
  font-size: 70%;
}
h1 {
  margin: 100px 0
}
</style>
