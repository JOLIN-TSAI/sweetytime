import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import Pagination from '@/components/pagination';
import ViewButton from '@/components/adminCRUD/viewButton';
import EditButton from '@/components/adminCRUD/editButton';
import ToggleButton from '@/components/adminCRUD/toggleButton';
import styles from '@/styles/adminLesson.module.scss';
import axios from 'axios';

export default function Lessons(props) {
	const [isToggled, setIsToggled] = useState(false);
	const [lesson, setLesson] = useState([]);
	const [stu, setStu] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10; // 每頁顯示的卡片數量

	// 計算當前頁顯示的卡片範圍
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const lessonToshow = lesson.slice(startIndex, endIndex);

	// 計算總頁數
	const totalPages = Math.ceil(lesson.length / ITEMS_PER_PAGE);
	console.log(lesson);

	const handleToggleClick = () => {
		setIsToggled(!isToggled);
		console.log('Toggle狀態:', isToggled ? '關閉' : '開啟');
	};

	useEffect(() => {
		axios
			.get('http://localhost:3005/api/lesson/admin')
			.then((res) => setLesson(res.data))
			.catch((error) => console.error('拿不到資料', error));
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:3005/api/lesson/student')
			.then((res) => {
				setStu(res.data.sort((a, b) => a.lesson_id - b.lesson_id));
			})
			.catch((error) => console.error('拿不到資料', error));
	}, []);
	console.log(stu);
	return (
		<>
			<AdminLayout>
				<table className={`${styles['CTH-table']} table table-hover`}>
					<thead class="text-center">
						<tr>
							<th>課程編號</th>
							<th>課程狀態</th>
							<th>課程名稱</th>
							<th>課程分類</th>
							<th>授課老師</th>
							<th>課程時間</th>
							<th>課程人數</th>
							<th>報名人數</th>
							<th>詳細資訊</th>
						</tr>
					</thead>
					<tbody>
						{lesson.length && stu.length > 0 ? (
							<>
								{lessonToshow.map((data, index) => {
									return (
										<>
											<tr class="text-center m-auto align-middle">
												<td>{data.id}</td>
												<td>
													{data.activation == 1 ? '上架中' : '已下架'}
												</td>
												<td>{data.lesson_name}</td>
												<td>{data.class_name}</td>
												<td>{data.teacher_name}</td>
												<td>{data.start_date}</td>
												<td>{data.quota}</td>
												<td>
													{stu.find(
														(dataStu) => dataStu.lesson_id === data.id
													)?.student_count || 0}
												</td>
												<td>
													<div className="d-flex gap-3 justify-content-center">
														<Link
															href={`./Lessons/viewLesson/${data.id}`}
														>
															<ViewButton />
														</Link>
														<Link href={'./Lessons/editLesson'}>
															<EditButton />
														</Link>
														<ToggleButton
															onClick={handleToggleClick}
															isActive={isToggled}
														/>
													</div>
												</td>
											</tr>
										</>
									);
								})}
							</>
						) : (
							''
						)}
					</tbody>
				</table>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={(page) => setCurrentPage(page)}
					changeColor="#fe6f67"
				/>
			</AdminLayout>
		</>
	);
}
