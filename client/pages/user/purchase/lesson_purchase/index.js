import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Styles from '@/styles/user.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UserBox from '@/components/user/userBox';
import PurchaseCard from '@/components/purchase-card/lesson';
import Pagination from '@/components/pagination';
import { withAuth } from '@/components/auth/withAuth';
import { FaSearch } from 'react-icons/fa';
import { useUser } from '@/context/userContext';

function UserPurchase() {
  const { user } = useUser();
  const [lessonOrders, setLessonOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // 使用 useMemo 優化搜尋效能
  const filteredLessonOrders = useMemo(() => {
    if (!currentSearchTerm.trim()) {
      return lessonOrders;
    }

    const searchLower = currentSearchTerm.toLowerCase().trim();

    return lessonOrders.filter((order) => {
      try {
        // 解析 order_info
        const orderInfo = JSON.parse(order.order_info || '{}');
        const courseName = orderInfo.packages?.[0]?.products?.[0]?.name || '';

        // 檢查訂單編號（完整匹配或部分匹配）
        const matchOrderId = order.order_id?.toLowerCase().includes(searchLower);

        // 檢查課程名稱
        const matchCourseName = courseName.toLowerCase().includes(searchLower);

        // 檢查上課時間（年月日）
        const courseTime = orderInfo.packages?.[0]?.products?.[0]?.time;
        const matchDate = courseTime
          ? new Date(courseTime)
              .toLocaleDateString('zh-TW')
              .replace(/\//g, '')
              .includes(searchLower.replace(/\//g, ''))
          : false;

        return matchOrderId || matchCourseName || matchDate;
      } catch (error) {
        console.error('Error parsing order data:', error);
        return false;
      }
    });
  }, [lessonOrders, currentSearchTerm]);

  // 使用 useMemo 優化分頁計算
  const { currentItems, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredLessonOrders.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const items = filteredLessonOrders.slice(indexOfFirstItem, indexOfLastItem);

    return {
      currentItems: items,
      totalPages: total,
    };
  }, [filteredLessonOrders, currentPage]);

  const fetchLessonOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('請先登入');
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/orders/lesson/details`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setLessonOrders(response.data.data);
      } else {
        throw new Error(response.data.message || '獲取訂單失敗');
      }
    } catch (error) {
      console.error('Fetch lessonOrders error:', error);
      setError(error.message || '獲取訂單資料失敗');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchLessonOrders();
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setCurrentSearchTerm(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <UserBox>
        <h2 className={`${Styles['WGS-pColor']}`}>課程歷史訂單</h2>
        <div className="d-flex flex-column py-5 gap-5 w-100">
          <form
            className={`${Styles['TIL-search']} d-flex justify-content-center gap-2`}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="px-3"
              placeholder="搜尋課程訂單"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className={`${Styles['TIL-Btn']} btn p-0`}
              aria-label="搜尋"
            >
              <FaSearch size={25} className={Styles['TIL-Fa']} />
            </button>
          </form>

          {currentSearchTerm && (
            <div className="d-flex justify-content-center gap-2 align-items-center">
              <span>目前搜尋: {currentSearchTerm}</span>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={handleClearSearch}
              >
                清除搜尋
              </button>
            </div>
          )}

          <div className="px-3 px-md-0 d-flex flex-column gap-3">
            {isLoading ? (
              <div className="text-center">載入中...</div>
            ) : error ? (
              <div className="text-center text-danger">{error}</div>
            ) : currentItems.length === 0 ? (
              <div className="text-center">
                {currentSearchTerm ? '沒有符合搜尋條件的訂單' : '目前沒有訂單'}
              </div>
            ) : (
              currentItems.map((item) => <PurchaseCard key={item.id} {...item} />)
            )}
          </div>

          {!isLoading && !error && currentItems.length > 0 && (
            <div className="m-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                changeColor="#fe6f67"
              />
            </div>
          )}
        </div>
      </UserBox>
      <Footer />
    </>
  );
}

export default withAuth(UserPurchase);