import React from 'react';
import styles from '@/styles/shopDetail.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import CircularSlider from '@/components/shop/shop-detail/CircularSlider';

export default function ShopDetail() {
	const circleLogos = [
		'/photos/shop_logo/sugar_logo.png',
		'/photos/shop_logo/mpapa_logo.png',
		'/photos/shop_logo/SEASON_Artisan_Pâtissier_logo.jpg',
		'/photos/shop_logo/laviebonbon_logo.jpg',
	];

	const shop = {
		name: 'SEASON Artisan Pâtissier敦南旗艦店',
		phone: '02-27085299',
		address: '台北市大安區敦化南路一段295巷16號1樓',
		description:
			'SEASON Artisan Pâtissier於2011年8月品牌誕生,在台北大直豪宅靜巷中發跡,也是甜點市場中人氣居高不墜的話題品牌,全台唯一提供多款現做盤式甜點的甜點概念餐廳,以獨特的個性和精緻的產品廣受媒體和美食同好熱愛推崇',
		logo_path: '/photos/shop_logo/SEASON_Artisan_Pâtissier_logo.jpg',
	};

	return (
		<>
			<Header />
			<div className={`${styles['TIL-bgColor']} container-fluid p-0`}>
				<div className={`${styles['TIL-shopDetailALL']} row w-100 mx-0`}>
					<div className="col-12 col-md-3 col-xl-3 d-flex flex-column gap-3 d-none d-md-block">
						<div className="position-sticky" style={{ top: '50px' }}>
							{circleLogos.map((logo, index) => (
								<div
									key={index}
									className={`${styles['TIL-sideBarCircle']} mx-auto p-0`}
								>
									<Image
										src={logo}
										alt={`Logo ${index + 1}`}
										width={70}
										height={70}
										className={styles['TIL-sideBarImage']}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Shop Details Section */}
					<div className="col-md-9 col-xl-9 d-flex flex-column gap-3 gap-md-5 my-5">
						<div className="d-flex flex-md-row justify-content-center flex-column-reverse px-md-3 px-lg-5">
							<div
								className={`${styles['TIL-shopContent']} col-lg-8 col-md-8 mx-lg-5 d-flex flex-column pe-md-2 me-md-3 col-12 p-3 p-lg-0 text-white`}
							>
								<h1 className="my-5 text-white">{shop.name}</h1>
								<div className="d-flex flex-row row me-lg-5 gap-3 gap-md-0 ">
									<div className="col-lg-3 col-md-4 m-0 text-center">
										<h3>聯絡電話：</h3>
									</div>
									<div className="col-lg-9 col-md-8 m-0 text-center text-md-start">
										<p>{shop.phone}</p>
									</div>
								</div>

								<div className="d-flex flex-row row me-lg-5 gap-3 gap-md-0">
									<div className="col-lg-3 col-md-4 m-0 text-center">
										<h3>商家地址：</h3>
									</div>
									<div className="col-lg-9 col-md-8 m-0 text-center text-md-start">
										<p>{shop.address}</p>
									</div>
								</div>

								<div className="d-flex flex-row row me-lg-5 gap-3 gap-md-0">
									<div className="col-lg-3 col-md-4 m-0 text-center">
										<h3>關於我們：</h3>
									</div>
									<div className="col-lg-9 col-md-8 m-0 text-center text-md-start">
										<p>{shop.description}</p>
									</div>
								</div>
							</div>
							<div
								className={`${styles['TIL-detail-logo']} my-auto col-lg-4 col-md-3 col-12 mx-auto`}
							>
								<Image
									src={shop.logo_path}
									alt={shop.name}
									width={50}
									height={50}
									className={`${styles['TIL-logo']}`}
								/>
							</div>
						</div>
						<CircularSlider />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
