import React from 'react'

function Logo(props) {
    const {pathname} = props
    return (
        <svg className={pathname ? "logo" : "logo active"} width="346" height="95" viewBox="0 0 346 95" fill="none">
            <path className='fill' d="M75.8809 0C75.8402 6.75579e-05 75.7999 0.00814917 75.7624 0.0238037C75.7249 0.0394582 75.6908 0.0623677 75.6621 0.091217C75.6334 0.120066 75.6108 0.154289 75.5953 0.191925C75.5799 0.229561 75.5721 0.269876 75.5723 0.310547V5.96875C75.5721 6.00942 75.5799 6.04974 75.5953 6.08737C75.6108 6.12501 75.6334 6.15923 75.6621 6.18808C75.6908 6.21693 75.7249 6.23984 75.7624 6.25549C75.7999 6.27115 75.8402 6.27923 75.8809 6.2793C75.9623 6.27813 76.04 6.24486 76.0971 6.18671C76.1541 6.12855 76.1859 6.05022 76.1855 5.96875V0.310547C76.1859 0.229077 76.1541 0.150745 76.0971 0.0925903C76.04 0.034436 75.9623 0.0011658 75.8809 0ZM66.4004 2.54688C66.3399 2.54256 66.2794 2.55614 66.2266 2.58594C66.1912 2.60622 66.1602 2.63333 66.1353 2.66565C66.1105 2.69797 66.0922 2.73487 66.0817 2.77426C66.0712 2.81366 66.0685 2.85476 66.074 2.89517C66.0794 2.93559 66.0927 2.97454 66.1133 3.00977L68.9434 7.91016C68.9636 7.94553 68.9907 7.97654 69.0231 8.0014C69.0554 8.02627 69.0923 8.04449 69.1317 8.05502C69.1711 8.06555 69.2122 8.06819 69.2526 8.06277C69.293 8.05735 69.332 8.04397 69.3672 8.02344C69.4369 7.98183 69.4875 7.91448 69.5079 7.83591C69.5284 7.75733 69.5171 7.67385 69.4766 7.60352L66.6465 2.70117C66.6212 2.65726 66.5856 2.62023 66.5427 2.59332C66.4998 2.56642 66.4509 2.55047 66.4004 2.54688ZM85.3594 2.54688C85.3085 2.55015 85.2592 2.56594 85.216 2.59286C85.1727 2.61979 85.1367 2.657 85.1113 2.70117L82.2812 7.60156C82.2607 7.63679 82.2473 7.67574 82.2419 7.71616C82.2365 7.75657 82.2391 7.79767 82.2497 7.83707C82.2602 7.87646 82.2784 7.91339 82.3033 7.94571C82.3281 7.97803 82.3592 8.0051 82.3945 8.02539C82.4656 8.06547 82.5496 8.07584 82.6282 8.05426C82.7069 8.03268 82.7738 7.98088 82.8145 7.91016L85.6445 3.00977C85.6857 2.93926 85.6973 2.85532 85.6768 2.77628C85.6563 2.69723 85.6054 2.62951 85.5352 2.58789C85.4819 2.55703 85.4207 2.54276 85.3594 2.54688ZM75.8789 7.92578C72.8606 7.92596 69.9659 9.12505 67.8316 11.2593C65.6973 13.3936 64.4982 16.2883 64.498 19.3066C64.4979 20.8013 64.7921 22.2814 65.364 23.6624C65.9358 25.0434 66.7741 26.2982 67.8309 27.3552C68.8878 28.4122 70.1424 29.2507 71.5233 29.8228C72.9042 30.3949 74.3842 30.6894 75.8789 30.6895C77.3738 30.6896 78.854 30.3953 80.2351 29.8233C81.6162 29.2514 82.8711 28.4129 83.9281 27.3559C84.9852 26.2989 85.8236 25.044 86.3956 23.6629C86.9676 22.2818 87.2619 20.8015 87.2617 19.3066C87.2616 17.8119 86.9671 16.3319 86.3951 14.951C85.823 13.5701 84.9845 12.3155 83.9275 11.2587C82.8705 10.2018 81.6156 9.36357 80.2347 8.79172C78.8537 8.21986 77.3736 7.92561 75.8789 7.92578ZM92.3535 9.5C92.2919 9.49647 92.2307 9.51143 92.1777 9.54297L87.2773 12.3711C87.242 12.3914 87.211 12.4185 87.1861 12.4508C87.1612 12.4831 87.143 12.52 87.1325 12.5594C87.1219 12.5988 87.1193 12.6399 87.1247 12.6803C87.1302 12.7207 87.1435 12.7597 87.1641 12.7949C87.2057 12.8647 87.273 12.9152 87.3516 12.9357C87.4302 12.9561 87.5137 12.9449 87.584 12.9043L92.4844 10.0742C92.5549 10.0339 92.6067 9.96747 92.6287 9.88925C92.6506 9.81103 92.6409 9.72734 92.6016 9.65625C92.5764 9.61171 92.5405 9.57412 92.4972 9.54684C92.4539 9.51957 92.4046 9.50348 92.3535 9.5ZM59.4062 9.50195C59.3561 9.50513 59.3075 9.52049 59.2646 9.54669C59.2217 9.5729 59.1859 9.60916 59.1602 9.65234C59.1396 9.68757 59.1263 9.72652 59.1208 9.76694C59.1154 9.80735 59.118 9.84845 59.1286 9.88785C59.1391 9.92724 59.1573 9.96417 59.1822 9.99649C59.2071 10.0288 59.2381 10.0559 59.2734 10.0762L64.1738 12.9043C64.2091 12.9248 64.248 12.9382 64.2884 12.9436C64.3288 12.949 64.3699 12.9464 64.4093 12.9359C64.4487 12.9254 64.4856 12.9071 64.518 12.8823C64.5503 12.8574 64.5774 12.8264 64.5977 12.791C64.6371 12.7202 64.6472 12.6366 64.6256 12.5584C64.604 12.4803 64.5526 12.4137 64.4824 12.373L59.5801 9.54297C59.5274 9.51249 59.467 9.49822 59.4062 9.50195ZM56.8809 19C56.7997 19.0001 56.7219 19.0321 56.6642 19.0891C56.6064 19.1461 56.5734 19.2236 56.5723 19.3047C56.5721 19.3454 56.5799 19.3857 56.5953 19.4233C56.6108 19.4609 56.6334 19.4952 56.6621 19.524C56.6908 19.5529 56.7249 19.5758 56.7624 19.5914C56.7999 19.6071 56.8402 19.6152 56.8809 19.6152H62.541C62.5818 19.6154 62.6223 19.6075 62.6601 19.592C62.6978 19.5764 62.7321 19.5536 62.761 19.5247C62.7899 19.4958 62.8128 19.4615 62.8283 19.4238C62.8438 19.386 62.8518 19.3455 62.8516 19.3047C62.8504 19.2232 62.8171 19.1455 62.759 19.0885C62.7008 19.0314 62.6225 18.9996 62.541 19H56.8809ZM89.2168 19C89.135 19.0001 89.0566 19.0327 88.9987 19.0905C88.9409 19.1484 88.9083 19.2268 88.9082 19.3086C88.9089 19.3901 88.9416 19.468 88.9994 19.5254C89.0572 19.5828 89.1353 19.6151 89.2168 19.6152H94.877C94.9588 19.6156 95.0374 19.5835 95.0956 19.5261C95.1538 19.4686 95.1868 19.3904 95.1875 19.3086C95.1874 19.2679 95.1793 19.2277 95.1637 19.1901C95.148 19.1526 95.1251 19.1185 95.0963 19.0898C95.0674 19.0612 95.0332 19.0385 94.9956 19.0231C94.9579 19.0077 94.9176 18.9998 94.877 19H89.2168ZM87.4102 25.668C87.3591 25.6715 87.3097 25.6875 87.2664 25.7148C87.2231 25.7421 87.1873 25.7797 87.1621 25.8242C87.1226 25.8951 87.1126 25.9786 87.1342 26.0568C87.1557 26.135 87.2071 26.2016 87.2773 26.2422L92.1777 29.0723C92.2482 29.1135 92.3322 29.1251 92.4112 29.1046C92.4903 29.0841 92.558 29.0331 92.5996 28.9629C92.6201 28.9277 92.6335 28.8887 92.6389 28.8483C92.6444 28.8079 92.6417 28.7668 92.6312 28.7274C92.6207 28.688 92.6024 28.6511 92.5776 28.6187C92.5527 28.5864 92.5217 28.5593 92.4863 28.5391L87.584 25.709C87.5313 25.6785 87.4709 25.6642 87.4102 25.668ZM64.3477 25.6699C64.2869 25.6662 64.2265 25.6805 64.1738 25.7109L59.2734 28.5391C59.2027 28.5797 59.1509 28.6466 59.1293 28.7253C59.1077 28.8039 59.1181 28.8879 59.1582 28.959C59.1992 29.0299 59.2666 29.0817 59.3457 29.1029C59.4248 29.1241 59.5091 29.1131 59.5801 29.0723L64.4824 26.2441C64.5178 26.2239 64.5488 26.1968 64.5737 26.1645C64.5985 26.1321 64.6168 26.0952 64.6273 26.0558C64.6378 26.0164 64.6404 25.9753 64.635 25.9349C64.6296 25.8945 64.6162 25.8555 64.5957 25.8203C64.5698 25.7769 64.5337 25.7404 64.4904 25.7142C64.4472 25.688 64.3982 25.6728 64.3477 25.6699ZM69.1895 30.5508C69.1389 30.5544 69.0901 30.5703 69.0471 30.5972C69.0042 30.6241 68.9686 30.6612 68.9434 30.7051L66.1152 35.6055C66.074 35.676 66.0624 35.7599 66.0829 35.839C66.1034 35.918 66.1544 35.9857 66.2246 36.0273C66.2956 36.0682 66.3799 36.0792 66.459 36.058C66.5381 36.0367 66.6055 35.985 66.6465 35.9141L69.4766 31.0137C69.4971 30.9784 69.5105 30.9395 69.5159 30.8991C69.5213 30.8587 69.5187 30.8176 69.5081 30.7782C69.4976 30.7388 69.4794 30.7018 69.4545 30.6695C69.4297 30.6372 69.3987 30.6101 69.3633 30.5898C69.3104 30.56 69.25 30.5465 69.1895 30.5508ZM82.5664 30.5508C82.5057 30.5471 82.4452 30.5613 82.3926 30.5918C82.3228 30.6334 82.2723 30.7008 82.2518 30.7793C82.2314 30.8579 82.2426 30.9414 82.2832 31.0117L85.1113 35.9141C85.152 35.9848 85.2189 36.0366 85.2976 36.0582C85.3762 36.0798 85.4602 36.0694 85.5312 36.0293C85.5666 36.009 85.5976 35.9819 85.6225 35.9496C85.6474 35.9173 85.6656 35.8804 85.6761 35.841C85.6866 35.8016 85.6893 35.7605 85.6839 35.7201C85.6784 35.6796 85.6651 35.6407 85.6445 35.6055L82.8145 30.7051C82.789 30.6609 82.7531 30.6237 82.7098 30.5968C82.6665 30.5699 82.6173 30.5541 82.5664 30.5508ZM75.877 32.3359C75.7955 32.3371 75.7178 32.3704 75.6607 32.4285C75.6037 32.4867 75.5719 32.565 75.5723 32.6465V38.3047C75.5719 38.3862 75.6037 38.4645 75.6607 38.5226C75.7178 38.5808 75.7955 38.6141 75.877 38.6152C75.9178 38.6154 75.9583 38.6075 75.996 38.592C76.0338 38.5764 76.0681 38.5536 76.097 38.5247C76.1258 38.4958 76.1487 38.4615 76.1642 38.4238C76.1798 38.386 76.1877 38.3455 76.1875 38.3047V32.6465C76.1877 32.6057 76.1798 32.5652 76.1642 32.5274C76.1487 32.4896 76.1258 32.4554 76.097 32.4265C76.0681 32.3976 76.0338 32.3747 75.996 32.3592C75.9583 32.3437 75.9178 32.3357 75.877 32.3359ZM197.947 38.4199C189.27 38.4199 182.466 40.9447 177.535 45.9961C172.605 51.0233 170.141 57.876 170.141 66.5527C170.141 75.1571 172.605 81.9967 177.535 87.0723C182.466 92.1237 189.27 94.6484 197.947 94.6484C206.648 94.6484 213.464 92.1237 218.395 87.0723C223.325 81.9967 225.789 75.1571 225.789 66.5527C225.789 57.876 223.312 51.0233 218.357 45.9961C213.403 40.9447 206.6 38.4199 197.947 38.4199ZM0 39.543V93.5254H13.9219V75.9414H22.5859C26.5255 75.9414 29.8128 75.3981 32.4473 74.3105C35.1059 73.2229 37.511 71.6152 39.6621 69.4883C41.2331 67.9173 42.4412 65.9836 43.2871 63.6875C44.133 61.3672 44.5566 58.999 44.5566 56.582C44.5566 53.4642 43.9765 50.7939 42.8164 48.5703C41.6805 46.3467 40.0248 44.5217 37.8496 43.0957C36.0369 41.9114 33.9448 41.0293 31.5762 40.4492C29.2317 39.845 26.3441 39.543 22.9121 39.543H0ZM111.117 39.543V93.5254H125.039V69.7422H145.596V93.5254H159.518V39.543H145.596V59.3008H125.039V39.543H111.117ZM236.412 39.543V93.5254H249.535V57.3809L259.543 80.8359H269.148L279.156 57.3809V93.5254H293.004V39.543H276.836L264.727 66.625L252.582 39.543H236.412ZM306.781 39.543V93.5254H345.826V83.084H320.631V69.7422H344.014V59.3008H320.631V49.9844H345.826V39.543H306.781ZM197.982 48.6074C199.723 48.6074 201.391 48.9334 202.986 49.5859C204.606 50.2385 206.031 51.2901 207.264 52.7402C208.472 54.142 209.452 55.9781 210.201 58.25C210.95 60.5219 211.324 63.2769 211.324 66.5156C211.324 69.5368 210.998 72.1722 210.346 74.4199C209.693 76.6435 208.689 78.5772 207.336 80.2207C206.127 81.6709 204.713 82.7463 203.094 83.4473C201.474 84.124 199.771 84.4609 197.982 84.4609C196.194 84.4609 194.49 84.124 192.871 83.4473C191.252 82.7705 189.837 81.719 188.629 80.293C187.42 78.8669 186.443 77.029 185.693 74.7812C184.968 72.5093 184.605 69.7673 184.605 66.5527C184.605 63.4108 184.979 60.6557 185.729 58.2871C186.502 55.8943 187.493 54.0195 188.701 52.666C190.006 51.2159 191.434 50.1772 192.98 49.5488C194.551 48.9204 196.218 48.6074 197.982 48.6074ZM13.9219 49.6211H16.3145C18.6105 49.6211 20.4466 49.6579 21.8242 49.7305C23.2019 49.7788 24.6163 50.0938 26.0664 50.6738C27.154 51.1089 28.1079 51.8824 28.9297 52.9941C29.7514 54.0818 30.1621 55.3856 30.1621 56.9082C30.1621 58.4551 29.9578 59.7718 29.5469 60.8594C29.1602 61.9228 28.5193 62.8418 27.625 63.6152C26.5857 64.4853 25.2929 65.0654 23.7461 65.3555C22.2234 65.6455 20.2768 65.791 17.9082 65.791H13.9219V49.6211Z" fill="#B35C01" />
            <path d="M103.36 39.543L83.6739 93.5252H68.0847L48.3987 39.543H63.0091L81.6433 93.7904L76.0605 77.4647L89.112 39.543H103.36Z" stroke="#B35C01" strokeWidth="1.8562" />
            <path d="M89.6309 40.1445H102.9M88.4805 41.8242H101.748M88.0566 43.5059H101.324M87.5117 45.1855H100.779M87.0879 46.8672H100.355M86.4199 48.5469H99.6895M86.0566 50.2285H99.3262M85.1484 51.9082H98.416M84.6035 53.5898H97.8711M84.4824 55.2715H97.75M83.998 56.9512H97.2656M82.7852 58.6328H96.0547M82.7852 60.3125H96.0547M81.5742 61.9941H94.8418M81.2715 63.6738H94.5391M80.4824 65.3555H93.752M80.2402 67.0352H93.5098M79.5137 68.7168H92.7813M79.1504 70.3965H92.418M78.666 72.0781H91.9336M77.8184 73.7578H91.0859M77.332 75.4395H90.6016M76.9688 77.1211H90.2383M75.6973 78.8008H88.9648M76.5977 80.3887H88.8066M77.1133 82.0703H87.959M77.8711 83.75H87.4746M78.8105 85.4316H87.1094M79.4453 87.1113H85.8379M79.4453 88.4141H85.8379M80.0527 90.1406H85.8379M80.2344 91.6855H84.8984" stroke="#B35C01" strokeWidth="0.469346" />
            <path d="M92.061 39.1591L76.7398 81.9078L78.3359 82.1788L93.671 39.2322L92.061 39.1591ZM95.4231 39.2895L78.5335 86.4155L80.2936 86.7122L97.197 39.3725L95.4231 39.2895ZM98.7556 39.6319L80.1335 91.5922L82.0734 91.9206L100.713 39.7229L98.7556 39.6319Z" stroke="#B35C01" strokeWidth="0.344051" />
            <path className='fill' d="M66.17 53.8615C66.0793 53.8577 65.9823 53.8728 65.8848 53.9162C65.4103 54.0258 64.9636 54.3591 64.1075 54.8186C63.2514 55.278 63.148 54.6579 61.9161 54.512C60.6842 54.3658 59.8007 54.7377 59.2579 55.2386C58.715 55.7398 58.1445 55.2004 56.9962 55.0961C55.8478 54.9918 55.5137 55.8891 55.5137 55.8891L55.4941 55.9322L68.7871 92.4107L80.0253 92.4069L66.8671 54.2506C66.8671 54.2506 66.5631 53.8774 66.17 53.8615ZM64.4161 64.8751L67.0548 72.3907L68.7911 69.0119L70.6778 82.2091L68.4727 72.7794L66.8438 75.6524L65.4434 69.6017L64.4161 64.8751Z" fill="#B35C01" />
        </svg>

    )
}

export default Logo