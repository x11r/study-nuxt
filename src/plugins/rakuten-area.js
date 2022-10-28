
export default {
    methods: {
        async getArea () {
            const appId = '1084441240286709213'
            const url = 'https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024?'
                + 'applicationId=' + appId

            const result = await this.$axios.get(url).then(response => {
                if (response.data.areaClasses.largeClasses[0].largeClass[0].largeClassCode === 'japan') {
                    this.largeAreas = response.data.areaClasses.largeClasses[0].largeClass[1]
                }
            }).catch(error => {
                console.log(error)
            })
        },
    }
}
