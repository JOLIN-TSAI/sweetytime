import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';

const CouponItem = ({ discount, title, endDate, showClaimButton = true }) => {
    const [isClaimed, setIsClaimed] = useState(false);

    const handleClaim = () => {
        console.log(`領取優惠券：${title}`);
        setIsClaimed(true);
    };

    // 根據 discount 值決定顯示格式
    const renderDiscount = () => {
        if (discount > 0) {
            return <h2>-{discount} %</h2>;
        } else {
            return <h2>{Math.abs(discount)} $</h2>;
        }
    };

    return (
        <div className={styles['popup-coupon-item']}>
            <div className={styles['popup-coupon-item-left']}>
                <div className={styles['popup-coupon-item-content-up']}>
                    {title}
                </div>
                <div className={styles['popup-coupon-item-content-down']}>
                    <div className={styles['popup-coupon-item-content-down-left']}>
                        <Image 
                            src="/vector/couponCake.svg" 
                            width={122} 
                            height={73} 
                            alt="Coupon cake"
                            className={styles['cake-image']}
                        />
                    </div>
                    <div className={styles['popup-coupon-details']}>
                        {renderDiscount()}
                        <span className={styles['date']}>
                            Expire Date: {endDate}
                        </span>
                        <hr />
                    </div>
                </div>
            </div>
            <div className={styles['popup-coupon-item-right']}>
                <div className={styles['popup-coupon-item-content-up']}>
                    <a>EST 2024</a>
                    <span>甜覓食光</span>
                    <a>Sweet time</a>
                </div>
                {showClaimButton && (
                    <div className={styles['popup-coupon-getCoupon']}>
                        <button 
                            onClick={handleClaim}
                            className={isClaimed ? styles['claimed'] : ''}
                            disabled={isClaimed}
                        >
                            {isClaimed ? '已領取' : '點我領取'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponItem;