<template>
  <div class="job-detail">
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="2" cols-xl="2">
        <b-col offset-lg="3" class="mt-5 w-full">
          <b-list-group>
            <b-list-group-item class="job-detail__title">
              <h4>İlan Detayı</h4>
            </b-list-group-item>
            <b-list-group-item>
              <b-row class="job-detail__content">
                <b-col sm="4"><b>İlan Tarihi</b></b-col>
                <b-col sm="8">{{ jobDetail[0].durationDayText }}</b-col>
                <b-col sm="4"><b>Pozisyon</b></b-col>
                <b-col sm="8">{{ jobDetail[0].positionName }}</b-col>
                <b-col sm="4"><b>Şirket</b></b-col>
                <b-col sm="8">{{ jobDetail[0].companyName }}</b-col>
                <b-col sm="4"><b>İş Tanımı</b></b-col>
                <b-col sm="8">{{ jobDetail[0].description }}</b-col>
                <b-col sm="4"><b>Ülke</b></b-col>
                <b-col sm="8">{{ jobDetail[0].countryName }}</b-col>
                <b-col sm="4"><b>Şehir</b></b-col>
                <b-col sm="8">{{ jobDetail[0].cityName }}</b-col>
                <b-col sm="4"><b>Açık Adres</b></b-col>
                <b-col sm="8">{{ jobDetail[0].address }}</b-col>
                <b-col sm="4"><b>Posta Kodu</b></b-col>
                <b-col sm="8">{{ jobDetail[0].postalCode }}</b-col>
                <b-col sm="4"><b>Telefon</b></b-col>
                <b-col sm="8">
                  {{ jobDetail[0].contactPhone.countryCallingCode }}
                  {{ jobDetail[0].contactPhone.areaCode }}
                  {{ jobDetail[0].contactPhone.number }}
                </b-col>
              </b-row>
              <iframe
                class="mt-2"
                width="100%"
                height="170"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="'https://maps.google.com/maps?q='+ jobDetail[0].latitude +','+jobDetail[0].longitude+'&hl=es&z=14&amp;output=embed'"
              >
              </iframe>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col offset-lg="3" class="mt-3">
          <a href="/" class="app-default-link">
            Anasayfaya Dön
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import jobDetailJson from '../../api/job-detail.json';
import jobListJson from '../../api/job-list.json';

export default {
  name: 'App',
  data() {
    return {
      jobId: this.$route.params.id,
      jobDetailList: jobDetailJson,
      jobDetail: null,
    };
  },
  computed: {
  },
  methods: {
    filteredDetailsFeed: function () {
      let fakeList;
      let jobId = this.jobId;
      let allList = this.jobDetailList.result.items;
      fakeList = allList.filter(function(item) {
        if(item.jobId === jobId) {
          return item;
        }
      });

      this.jobDetail = fakeList;
    },
  },
  created() {
    this.filteredDetailsFeed();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.job-detail {
  &__title {
    background: #f9f9f9;
    color: #912da2;
  }
  &__content {
    text-align: left;
    div {
      margin-bottom: 8px;
    }
  }
}
</style>
