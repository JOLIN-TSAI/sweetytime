import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { IoIosSearch } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Slider,
	Box,
	FormControlLabel,
	Typography,
} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';

// function valuetext(value) {
// 	return `${value}°C`;
// }
// 給Slider用的，暫時用不到

export default function FilterBox(props) {
	const [type, setType] = useState(0);
	const [sort, setSort] = useState(0);
	const [value, setValue] = useState([0, 1000]);
	const [selectedShop, setSelectedShop] = useState(0);

	const handleChangeType = (event) => {
		setType(event.target.value);
	};

	const handleChangeSort = (event) => {
		setSort(event.target.value);
	};

	const handleChangeValue = (event, newValue) => {
		setValue(newValue);
	};

	const handleSelectingShop = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<div
				className={`${styles['filter']} d-none d-md-flex justify-content-center gap-2 flex-wrap align-items-center mt-5`}
			>
				<div
					className={`${styles['filter-part1']} filter-box justify-content-center gap-2 flex-wrap align-items-center my-1`}
				>
					{/* ==========搜尋關鍵字========= */}
					<input
						type="text"
						className={`${styles['filter-keywords']}`}
						id="keywords"
						placeholder="關鍵字"
						color="#fe6f67"
					/>

					{/* ===========類別篩選========== */}
					<FormControl sx={{ width: 181, height: '100%' }}>
						{/* <InputLabel
						id="demo-simple-select-label"
						sx={{
							color: '#ffffff',
							'&.Mui-focused': {
								color: '#fe6f67', // 聚焦時的外框顏色
							},
						}}
					>
						類別
					</InputLabel> */}
						<Select
							// labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={type || ''}
							// label="type"
							onChange={handleChangeType}
							displayEmpty
							MenuProps={{
								disableScrollLock: true, // 禁用滾動條鎖定
							}}
							// IconComponent={() => null}
							sx={{
								backgroundColor: '#ffffff',
								height: '100%',
								color: '#fe6f67',
								borderRadius: '30px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#fe6f67', // 預設外框顏色
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: '#fe6f67', // 滑鼠懸停外框顏色
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									minWidth: 120,
									borderColor: '#fe6f67', // 聚焦時的外框顏色
								},
								'& .MuiSelect-icon': {
									backgroundImage: `url('/icon/select_arrow.svg')`, // 指定自訂箭頭的 SVG 圖片
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
									width: '20px',
									height: '20px',
									color: 'transparent', // 隱藏預設顏色
									transition: 'transform 0.3s',
									position: 'absolute', // 固定位置
									right: '15px', // 調整左右位置
									top: '44%', // 垂直居中
									transform: 'translateY(-20%)',
								},
								'& .MuiSelect-iconOpen': {
									transform: 'translateY(-50%) scaleY(-1)', // 展開狀態，垂直居中並旋轉 180 度
								},
							}}
						>
							<MenuItem value="" sx={{ color: '#fe6f67' }}>
								類別
							</MenuItem>
							<MenuItem value={'cake'} sx={{ color: '#fe6f67' }}>
								蛋糕
							</MenuItem>
							<MenuItem value={'cookies'} sx={{ color: '#fe6f67' }}>
								餅乾
							</MenuItem>
							<MenuItem value={'tart'} sx={{ color: '#fe6f67' }}>
								塔/派
							</MenuItem>
							<MenuItem value={'puff'} sx={{ color: '#fe6f67' }}>
								泡芙
							</MenuItem>
							<MenuItem value={'icecream'} sx={{ color: '#fe6f67' }}>
								冰淇淋
							</MenuItem>
							<MenuItem value={'cannele'} sx={{ color: '#fe6f67' }}>
								可麗露
							</MenuItem>
							<MenuItem value={'else'} sx={{ color: '#fe6f67' }}>
								其他
							</MenuItem>
						</Select>
					</FormControl>

					{/* ===========排序方式========== */}
					<FormControl sx={{ width: 181, height: '100%' }}>
						{/* <InputLabel
						id="demo-simple-select-label"
						sx={{
							color: '#fe6f67',
							'&.Mui-focused': {
								color: '#fe6f67', // 聚焦時的外框顏色
							},
						}}
					>
						排序
					</InputLabel> */}
						<Select
							// labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={sort || ''}
							// label="sort"
							onChange={handleChangeSort}
							displayEmpty
							MenuProps={{
								disableScrollLock: true, // 禁用滾動條鎖定
							}}
							sx={{
								background: '#ffffff',
								height: '100%',
								color: '#fe6f67',
								borderRadius: '30px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#fe6f67', // 預設外框顏色
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: '#fe6f67', // 滑鼠懸停外框顏色
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									minWidth: 120,
									borderColor: '#fe6f67', // 聚焦時的外框顏色
								},
								'& .MuiSelect-icon': {
									backgroundImage: `url('/icon/select_arrow.svg')`, // 指定自訂箭頭的 SVG 圖片
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
									width: '20px',
									height: '20px',
									color: 'transparent', // 隱藏預設顏色
									transition: 'transform 0.3s',
									position: 'absolute', // 固定位置
									right: '15px', // 調整左右位置
									top: '44%', // 垂直位置
									transform: 'translateY(-20%)',
								},
								'& .MuiSelect-iconOpen': {
									transform: 'translateY(-50%) scaleY(-1)', // 展開狀態，垂直居中並旋轉 180 度
								},
							}}
						>
							<MenuItem value={''} sx={{ color: '#fe6f67' }}>
								排序
							</MenuItem>
							<MenuItem value={'timeClose'} sx={{ color: '#fe6f67' }}>
								開課時間近到遠
							</MenuItem>
							<MenuItem value={'timeFar'} sx={{ color: '#fe6f67' }}>
								開課時間遠到近
							</MenuItem>
							<MenuItem value={'peopleLess'} sx={{ color: '#fe6f67' }}>
								報名人數少到多
							</MenuItem>
							<MenuItem value={'people'} sx={{ color: '#fe6f67' }}>
								報名人數多到少
							</MenuItem>
							<MenuItem value={'cheap'} sx={{ color: '#fe6f67' }}>
								價錢便宜到貴
							</MenuItem>
							<MenuItem value={'expensive'} sx={{ color: '#fe6f67' }}>
								價錢貴到便宜
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div
					className={`${styles['filter-part2']} filter-box d-flex gap-2 flex-wrap align-items-center my-1 `}
				>
					{/* ===========價格範圍========== */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							border: '1px solid #fe6f67',
							borderRadius: '30px',
							height: '100%',
							padding: '5px 10px 5px 20px',
							backgroundColor: '#ffffff',
						}}
					>
						<Box sx={{ width: 120, mr: 2, display: 'flex', alignItems: 'center' }}>
							<Slider
								getAriaLabel={() => 'Temperature range'}
								value={value}
								onChange={handleChangeValue}
								valueLabelDisplay="auto"
								// getAriaValueText={valuetext}
								max={5000}
								step={100}
								sx={{
									color: '#fe6f67',
								}}
							/>
						</Box>
						<Typography
							sx={{
								mr: 1,
								width: 108,
								color: '#000',
								fontWeight: 'bold',
								textAlign: 'center',
							}}
						>
							${value[0]} - ${value[1]}
						</Typography>
					</Box>

					{/* ===========優惠勾選========== */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '100%',
							border: '1px solid #fe6f67',
							borderRadius: '50px',
							padding: '5px 20px',
							backgroundColor: '#ffffff',
						}}
					>
						<Checkbox
							defaultChecked
							sx={{
								padding: 0,
								'& .MuiSvgIcon-root': {
									display: 'none', // 隱藏預設勾選圖示
								},
								'&.Mui-checked': {
									'&:before': {
										content: '""',
										display: 'block',
										width: 16,
										height: 16,
										backgroundColor: '#4CAF50', // 勾選時的綠色圓點
										borderRadius: '50%',
										border: '2px solid #fff', // 使綠色圓點跟外框有間距
										boxShadow: '0 0 0 1px #545454', // 假外框
									},
								},
								'&:before': {
									content: '""',
									display: 'block',
									width: 16,
									height: 16,
									backgroundColor: 'transparent',
									borderRadius: '50%',
									border: '1px solid #333', // 未勾選時的圓框
									border: '2px solid #fff', // 使綠色圓點跟外框有間距
									boxShadow: '0 0 0 1px #545454', // 假外框
								},
							}}
						/>
						<Box sx={{ color: '#fe6f67', fontWeight: 'bold', marginLeft: '8px' }}>
							優惠
						</Box>
					</Box>

					{/* ===========送出按鈕========== */}
					<button className={styles['filter-search']}>
						<IoIosSearch className={styles['filter-search-icon']} />
					</button>
				</div>
			</div>

			{/* ==============================手機板=================================== */}

			<div
				className={`${styles['filter_mobile']} d-flex d-md-none justify-content-center gap-2 flex-wrap align-items-center mt-5`}
			>
				{/* ==========搜尋關鍵字========= */}
				<input
					type="text"
					className={`${styles['filter-keywords_mobile']}`}
					id="keywords"
					placeholder="關鍵字"
					color="#b6b6b6"
					fontWeight="bold"
				/>

				{/* ===========類別篩選========== */}
				<FormControl sx={{ width: '100%' }}>
					{/* <InputLabel
						id="demo-simple-select-label"
						sx={{
							color: '#ffffff',
							'&.Mui-focused': {
								color: '#fe6f67', // 聚焦時的外框顏色
							},
						}}
					>
						類別
					</InputLabel> */}
					<Select
						// labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={type || ''}
						// label="type"
						onChange={handleChangeType}
						displayEmpty
						MenuProps={{
							disableScrollLock: true, // 禁用滾動條鎖定
						}}
						// IconComponent={() => null}
						sx={{
							backgroundColor: '#ffffff',
							height: '100%',
							color: '#b6b6b6',
							fontWeight: '900',
							borderRadius: '30px',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'transparent', // 預設外框顏色
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: '#ffbd59', // 滑鼠懸停外框顏色
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								minWidth: 120,
								borderColor: '#ffbd59', // 聚焦時的外框顏色
							},
							'& .MuiSelect-icon': {
								backgroundImage: `url('/icon/select_arrow_grey.svg')`, // 指定自訂箭頭的 SVG 圖片
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								width: '20px',
								height: '20px',
								color: 'transparent', // 隱藏預設顏色
								transition: 'transform 0.3s',
								position: 'absolute', // 固定位置
								right: '15px', // 調整左右位置
								top: '44%', // 垂直居中
								transform: 'translateY(-20%)',
							},
							'& .MuiSelect-iconOpen': {
								transform: 'translateY(-50%) scaleY(-1)', // 展開狀態，垂直居中並旋轉 180 度
							},
						}}
					>
						<MenuItem value="" sx={{ color: '#747474' }}>
							類別
						</MenuItem>
						<MenuItem value={'cake'} sx={{ color: '#747474' }}>
							蛋糕
						</MenuItem>
						<MenuItem value={'cookies'} sx={{ color: '#747474' }}>
							餅乾
						</MenuItem>
						<MenuItem value={'tart'} sx={{ color: '#747474' }}>
							塔/派
						</MenuItem>
						<MenuItem value={'puff'} sx={{ color: '#747474' }}>
							泡芙
						</MenuItem>
						<MenuItem value={'icecream'} sx={{ color: '#747474' }}>
							冰淇淋
						</MenuItem>
						<MenuItem value={'cannele'} sx={{ color: '#747474' }}>
							可麗露
						</MenuItem>
						<MenuItem value={'else'} sx={{ color: '#747474' }}>
							其他
						</MenuItem>
					</Select>
				</FormControl>

				{/* ===========商家========== */}
				<FormControl sx={{ width: '100%' }}>
					<Select
						id="demo-simple-select"
						value={selectedShop || ''}
						onChange={handleSelectingShop}
						displayEmpty
						MenuProps={{
							disableScrollLock: true, // 禁用滾動條鎖定
						}}
						sx={{
							background: '#ffffff',
							height: '100%',
							color: '#b6b6b6',
							fontWeight: '900',
							borderRadius: '30px',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'transparent', // 預設外框顏色
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: '#ffbd59', // 滑鼠懸停外框顏色
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								minWidth: 120,
								borderColor: '#ffbd59', // 聚焦時的外框顏色
							},
							'& .MuiSelect-icon': {
								backgroundImage: `url('/icon/select_arrow_grey.svg')`, // 指定自訂箭頭的 SVG 圖片
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								width: '20px',
								height: '20px',
								color: 'transparent', // 隱藏預設顏色
								transition: 'transform 0.3s',
								position: 'absolute', // 固定位置
								right: '15px', // 調整左右位置
								top: '44%', // 垂直位置
								transform: 'translateY(-20%)',
							},
							'& .MuiSelect-iconOpen': {
								transform: 'translateY(-50%) scaleY(-1)', // 展開狀態，垂直居中並旋轉 180 度
							},
						}}
					>
						<MenuItem value={''} sx={{ color: '#747474' }}>
							商家
						</MenuItem>
					</Select>
				</FormControl>

				{/* ===========排序方式========== */}
				<FormControl sx={{ width: '100%' }}>
					{/* <InputLabel
						id="demo-simple-select-label"
						sx={{
							color: '#fe6f67',
							'&.Mui-focused': {
								color: '#fe6f67', // 聚焦時的外框顏色
							},
						}}
					>
						排序
					</InputLabel> */}
					<Select
						// labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={sort || ''}
						// label="sort"
						onChange={handleChangeSort}
						displayEmpty
						MenuProps={{
							disableScrollLock: true, // 禁用滾動條鎖定
						}}
						sx={{
							background: '#ffffff',
							height: '100%',
							color: '#b6b6b6',
							fontWeight: '900',
							borderRadius: '30px',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'transparent', // 預設外框顏色
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: '#ffbd59', // 滑鼠懸停外框顏色
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								minWidth: 120,
								borderColor: '#ffbd59', // 聚焦時的外框顏色
							},
							'& .MuiSelect-icon': {
								backgroundImage: `url('/icon/select_arrow_grey.svg')`, // 指定自訂箭頭的 SVG 圖片
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								width: '20px',
								height: '20px',
								color: 'transparent', // 隱藏預設顏色
								transition: 'transform 0.3s',
								position: 'absolute', // 固定位置
								right: '15px', // 調整左右位置
								top: '44%', // 垂直位置
								transform: 'translateY(-20%)',
							},
							'& .MuiSelect-iconOpen': {
								transform: 'translateY(-50%) scaleY(-1)', // 展開狀態，垂直居中並旋轉 180 度
							},
						}}
					>
						<MenuItem value={''} sx={{ color: '#747474' }}>
							排序
						</MenuItem>
						<MenuItem value={'timeClose'} sx={{ color: '#747474' }}>
							開課時間近到遠
						</MenuItem>
						<MenuItem value={'timeFar'} sx={{ color: '#747474' }}>
							開課時間遠到近
						</MenuItem>
						<MenuItem value={'peopleLess'} sx={{ color: '#747474' }}>
							報名人數少到多
						</MenuItem>
						<MenuItem value={'people'} sx={{ color: '#747474' }}>
							報名人數多到少
						</MenuItem>
						<MenuItem value={'cheap'} sx={{ color: '#747474' }}>
							價錢便宜到貴
						</MenuItem>
						<MenuItem value={'expensive'} sx={{ color: '#747474' }}>
							價錢貴到便宜
						</MenuItem>
					</Select>
				</FormControl>

				{/* ===========價格範圍========== */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						border: '1px solid transparent',
						borderRadius: '30px',
						height: '48px',
						width: '100%',

						padding: '5px 10px 5px 20px',
						backgroundColor: '#ffffff',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						className={styles['slider-box_mobile']}
					>
						<Slider
							getAriaLabel={() => 'Temperature range'}
							value={value}
							onChange={handleChangeValue}
							valueLabelDisplay="auto"
							// getAriaValueText={valuetext}
							max={5000}
							sx={{
								color: '#FFE348', // 選取範圍內的顏色
								'& .MuiSlider-rail': {
									color: '#000', // 選取範圍外的顏色
								},
							}}
						/>
					</Box>
					<Typography
						sx={{
							mr: 1,
							width: 115,
							color: '#000',
							fontWeight: 'bold',
							textAlign: 'center',
							fontFamily: 'DM sans',
						}}
					>
						${value[0]} - ${value[1]}
					</Typography>
				</Box>

				{/* ===========優惠勾選========== */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '48px',
						width: '100%',
						border: '1px solid transparent',
						borderRadius: '50px',
						padding: '5px 20px',
						backgroundColor: '#ffffff',
					}}
				>
					<Checkbox
						defaultChecked
						sx={{
							padding: 0,
							'& .MuiSvgIcon-root': {
								display: 'none', // 隱藏預設勾選圖示
							},
							'&.Mui-checked': {
								'&:before': {
									content: '""',
									display: 'block',
									width: 16,
									height: 16,
									backgroundColor: '#4CAF50', // 勾選時的綠色圓點
									borderRadius: '50%',
									border: '2px solid #fff', // 使綠色圓點跟外框有間距
									boxShadow: '0 0 0 1px #545454', // 假外框
								},
							},
							'&:before': {
								content: '""',
								display: 'block',
								width: 16,
								height: 16,
								backgroundColor: 'transparent',
								borderRadius: '50%',
								border: '1px solid #333', // 未勾選時的圓框
								border: '2px solid #fff', // 使綠色圓點跟外框有間距
								boxShadow: '0 0 0 1px #545454', // 假外框
							},
						}}
					/>
					<Box sx={{ color: '#b6b6b6', fontWeight: 'bold', marginLeft: '8px' }}>優惠</Box>
				</Box>
			</div>
			{/* ===========送出按鈕========== */}
			<button className={styles['filter-search_mobile']}>
				<FaMagnifyingGlass className={styles['filter-search_mobile-icon']} />
			</button>
		</>
	);
}
