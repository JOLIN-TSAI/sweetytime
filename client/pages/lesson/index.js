import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Banner from '@/components/lesson/banner';
import LessonCard from '@/components/lesson/lesson-card';
import SmLesson from '@/components/lesson/small-lesson';
import FilterBox from '@/components/filter-box';
import Tags from '@/components/lesson/tag';
import Pagination from '@/components/pagination';
import Footer from '@/components/footer';
import styles from '@/styles/lesson.module.scss';

export default function Lesson() {
	return (
		<>
			<Header />
			<Banner />
			<div className="container mt-2">
				<div className="filter-zone-pc d-none d-md-block">
					<FilterBox />
					<div className="d-flex justify-content-center">
						<Image src={'icon/decorateIcons.svg'} width={750} height={60} alt="裝飾" />
					</div>
					<Tags />
				</div>
				<div className="filter-zone-mb d-md-none d-block">
					<FilterBox />
				</div>
				<div className="lesson-info row justify-content-between">
					<div className="lesson-card-group d-flex flex-wrap col-lg-9 col-md-8 justify-content-around">
						<LessonCard />
						<LessonCard />
						<LessonCard />
						<LessonCard />
						<LessonCard />
						<LessonCard />
					</div>
					<div className={`${styles['CTH-sm-lesson-box']} col-auto`}>
						<div className="text-center mb-3">即將開課</div>
						<SmLesson />
						<SmLesson />
						<SmLesson />
						<SmLesson />
						<SmLesson />
					</div>
				</div>
			</div>
			<div className='mb-3'>
				<Pagination
					currentPage={1}
					totalPages={5}
					onPageChange={() => {}}
					changeColor="#fe6f67"
				/>
			</div>
			<Footer />
		</>
	);
}
