$(function(){

  function num(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  /**
   * 
   * @param {*} a 일부
   * @param {*} b 전체
   * @returns 
   */
  function precent(a,b) {
    return Math.floor(a/b*100);
  }
  // return값 찍어주는거

  

  /**
   * group-product 상품 
   */
  fetch('../assets/data/dummy_product.json')
  .then((response) => response.json())
  .then((json) => {
    data = json.items;

    let html = '';

    data.forEach(element => {

      oriEl = (element.price.ori)

      if(element.price.ori == element.price.curr){
        priceEl =  `<strong>${num(element.price.curr)}<span class="unit">원</span></strong>`
      }else{
        priceEl = `
        <span class="before">${num(element.price.ori)}</span>
        <strong>${num(element.price.curr)}<span class="unit">원</span></strong>
        <em class="sale">${precent(element.price.curr,element.price.ori)}<span>%</span></em>`
      }

        memberEl = `<div class="member">
            <span class="coupon">멤버십 쿠폰가</span>
            <span class="price">${num(element.price.curr-element.price.curr*0.2)} 원</span>
        </div>` 
        isMember = (element.member) ? memberEl:''; 
      html += `<li class="swiper-slide">
              <div class="thumb-box">
                  <a href="/product/detail.html?prdId=${element.prdId}" class="thumb">
                  <img src="${element.thumnails.url}" alt></a>
                  <a class="link-cart"><img src="./assets/images/ic-cart.svg" alt="장바구니 추가"></a>
              </div>
              <a class="info-box">
                  <p>${element.title}</p>
                  <div class="price">
                      ${priceEl}
                      
                  </div>
                  ${isMember}
              </a>
            </a>
            </li>`;

    });

    $('#prd1').html(html);


  })





    /**
     * swiper
     * sc-visual
     * sc-event
     */
     let visual = new Swiper(".visual", {
        autoplay:{
            delay:3000,
        },
        loop:true,
        speed:300,

        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      });


      $('.sc-visual .swiper-pagination').click(function(){
        $('.sc-event').toggleClass('on');
      })
      $('.sc-event .btn-close').click(function(){
        $('.sc-event').removeClass('on').slideDown();
      })

      /**
       * swiper
       * group-product
       */
      let product = new Swiper(".product", {
        
        slidesPerView: 'auto',
        spaceBetween: 10,
      });

      let limit = new Swiper(".product2", {
        
        slidesPerView: 1.6,
        spaceBetween: 10,
      });

      /**
       * swiper
       * sc-time 타임세일
       */
       let time = new Swiper(".time", {
        slidesPerView: 1.3,
        
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      });


      /**
       * swiper
       * group-recomm
       */
      let recomm = new Swiper(".recomm", {
        spaceBetween: 20,
        
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      });


      /**
       * swiper
       * catemenu
       * categoods
       */
       let catemenu = new Swiper(".catemenu", {
        slidesPerView: "auto",
      });
       let categoods = new Swiper(".categoods", {
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
      });

      catemenu.controller.control = categoods;
      categoods.controller.control = catemenu;

      $('.sc-cate .catemenu li').click(function (e) { 
        e.preventDefault();
        idx = $(this).index();

        catemenu.slideTo(idx);
        categoods.slideTo(idx);
      });






      /**
       * 상단 스크롤 이동
       */
       $(window).scroll(function(){
            
        if ($(this).scrollTop() > 1200) {
            $('.btn-top').addClass('active');
        } else {
            $('.btn-top').removeClass('active');
        }
      })

      $('.btn-top').click(function(){
          $('html, body').animate({scrollTop : 0}, 400)
          return false;
      })



      /**
       * 타임특가
       */
      function diffDay() {
        const endTime = new Date("2022-12-25");
        const todayTime = new Date();
        const diff = endTime - todayTime;

        const diffDay = Math.floor(diff / (1000*60*60*24));
        const diffHour = Math.floor((diff / (1000*60*60)) % 24);
        const diffMin = Math.floor((diff / (1000*60)) % 60);
        const diffSec = Math.floor(diff / 1000 % 60);

        html = `<span class="time-hour">${diffHour}</span>
                :
                <span class="time-min">${diffMin}</span>
                :
                <span class="time-sec">${diffSec}</span>`
        $('#date1').html(html);
    }
    
    setInterval(() =>{
      
      diffDay();
    },1000);



    /**
     * 인스타그램 링크 연결
     */
    fetch('../assets/data/dummy_insta.json')
    .then((response) => response.json())
    .then((json) => {
      data=json.items;


      let html='';
      data.forEach(element => {
        html+= `<li class="insta-item">
                <a href="https://www.instagram.com/p/${element.id}/">
                <img src="${element.img}" alt="${element.alt}">
                </a>
                </li>`
                
      });


      $('#instaList').html(html);
    })



})
    
 