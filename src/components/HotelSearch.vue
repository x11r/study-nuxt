<template>
    <div>
        <div class="col-md-12">ホテル検索</div>
        <div class="col-md-12">
            <div class="col-12">都道府県</div>
            <div class="col-12">
                <button
                    v-for="(middleClass, index) in largeAreas.middleClasses"
                    v-on:click="selectMiddle(index)"
                    class="btn btn-light"
                >
                    {{ middleClass.middleClass[0].middleClassName }}
                </button>
            </div>
        </div>
        <div class="">
            <div class="col-md-12">
                市区町村
            </div>
            <div class="col-md-12" v-if="middleAreas !== null && middleAreas.middleClass">
                <div
                    v-for="(area, index) in middleAreas.middleClass[1].smallClasses"
                >
                    <!-- エリア見出し -->
                    <button
                        v-on:click="selectSmall(index)"
                        class="btn btn-light"
                    >
                        {{ area.smallClass[0].smallClassName }}
                    </button>
                </div>
            </div>
        </div>
        <div v-if="hotels !== null">
            ホテル一覧
        </div>
        <div v-if="hotels !== null">
            <div
                v-for="(hotel, index) in hotels"
                class="border border-3"
            >
                <div>
                    {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
                    {{ hotel.hotel[0].hotelBasicInfo.address1 }}
                    {{ hotel.hotel[0].hotelBasicInfo.address2 }}
                </div>
                <div>
                    <img :src="hotel.hotel[0].hotelBasicInfo.hotelThumbnailUrl">
                    <img :src="hotel.hotel[0].hotelBasicInfo.roomThumbnailUrl">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const largeClassCode = 'japan'

export default {
    name: "HotelSearch",
    created () {
        this.applicationId = process.env.VUE_RAKUTEN_APP_ID
    },
    data () {
        return {
            applicationId: '',
            hotels: null,
            largeAreas: [],
            middleAreas: null,
            middleClassCode: '',
            smallAreas: [],
            smallClassCode: ''
        }
    },
    mounted () {
        this.getArea()
    },
    methods: {
        // エリア一覧取得
        getArea() {
            const url = 'https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024?'
                + 'applicationId=' + this.applicationId

            console.log(url)

            this.$axios.get(url).then(response => {
                if (response.data.areaClasses.largeClasses[0].largeClass[0].largeClassCode === largeClassCode) {
                    this.largeAreas = response.data.areaClasses.largeClasses[0].largeClass[1]
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 都道府県選択
        selectMiddle(index) {
            // console.log('==== select middle ====')
            // console.log(index)
            // console.log(this.largeAreas.middleClasses[index].middleClass)
            // console.log(this.largeAreas.middleClasses[index].middleClass[0].middleClassCode)
            // console.log(this.largeAreas.middleClasses[index].middleClass[1])
            // console.log(this.largeAreas.middleClasses[index].middleClass[1].smallClasses)

            this.middleAreas = this.largeAreas.middleClasses[index]
            this.middleClassCode = this.largeAreas.middleClasses[index].middleClass[0].middleClassCode
        },
        selectSmall(index) {
            // console.log('== select small ' + index)
            // console.log(this.middleAreas.middleClass[1].smallClasses[index])
            // console.log(this.middleAreas.middleClass[1].smallClasses[index].smallClass[0].smallClassCode)
            // console.log(this.middleAreas.middleClass[1].smallClasses[index].smallClass[0].smallClassName)

            const smallClassCode = this.middleAreas.middleClass[1].smallClasses[index].smallClass[0].smallClassCode

            const url = 'https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?'
                + 'applicationId=' + this.applicationId
                + '&largeClassCode=' + largeClassCode
                + '&middleClassCode=' + this.middleClassCode
                + '&smallClassCode=' + smallClassCode

            // console.log(url)

            const hotels = this.$axios.get(url).then(response => {
                this.hotels = response.data.hotels
            }).catch(error => {
                console.log(error)
            })
        },
    }
}
</script>

<style scoped>

</style>
