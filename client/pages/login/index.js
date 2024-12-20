import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/WGS-login.module.scss';
import ExpandButton from '@/components/button/expand-button';
import GoogleLogin from '@/components/GoogleLogin';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@/context/userContext';
import PasswordValidation from '@/components/PasswordValidation';

import QuickLogin from '@/components/QuickLogin';

const Login = () => {
	const router = useRouter();
	const [showRegister, setShowRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showDucktalk, setShowDucktalk] = useState(true);
	const [duckMessage, setDuckMessage] = useState('歡迎成為Sweety Timer～');
	const [isAnimating, setIsAnimating] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [registerError, setRegisterError] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState(false);
	const { login } = useUser(); // 從 context 中取得 login 函數

	// 登入表單數據
	const [formData, setFormData] = useState({
		account: '',
		password: '',
	});

	// 記住我的狀態
	const [rememberMe, setRememberMe] = useState(false);

	// 顯示新的訊息
	const showNewMessage = (message) => {
		setDuckMessage(message);
		setShowDucktalk(true);
		setIsAnimating(true);
		// 動畫結束後重置狀態，這樣下次才能再次觸發
		setTimeout(() => {
			setIsAnimating(false);
		}, 500);
	};

	// 在組件加載時檢查是否有保存的登入信息
	useEffect(() => {
		const savedLoginInfo = localStorage.getItem('rememberedUser');
		if (savedLoginInfo) {
			const { account, rememberMe } = JSON.parse(savedLoginInfo);
			setFormData((prev) => ({
				...prev,
				account: account,
			}));
			setRememberMe(rememberMe);
		}
	}, []);

	// 處理記住我的變更
	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
		if (!e.target.checked) {
			// 如果取消勾選，清除保存的信息
			localStorage.removeItem('rememberedUser');
		}
	};

	// 註冊表單數據
	const [registerData, setRegisterData] = useState({
		name: '',
		account: '',
		password: '',
		retype_password: '',
		email: '',
		phone: '',
		birthday: '',
		terms: false,
	});

	// 處理註冊表單輸入的函數
	const handleRegisterInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setRegisterData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	// 處理註冊提交
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setRegisterError('');

		// 檢查姓名是否為空
		if (!registerData.name.trim()) {
			setRegisterError('請輸入姓名');
			showNewMessage('記得填寫姓名呱！');
			setShowDucktalk(true);
			return;
		}

		// 檢查姓名長度是否合理 (假設 2-20 字元)
		if (registerData.name.trim().length < 2 || registerData.name.trim().length > 16) {
			setRegisterError('姓名長度需要在 2-16 字元之間');
			showNewMessage('你名字再亂取沒關係呱！');
			setShowDucktalk(true);
			return;
		}

		// 檢查帳號是否為空
		if (!registerData.account.trim()) {
			setRegisterError('請輸入帳號');
			showNewMessage('帳號不能空白呱！');
			setShowDucktalk(true);
			return;
		}

		// 檢查密碼是否為空
		if (!registerData.password.trim()) {
			setRegisterError('請輸入密碼');
			showNewMessage('密碼不能空白呱！');
			setShowDucktalk(true);
			return;
		}

		if (!isPasswordValid) {
			setRegisterError('請確保密碼符合所有要求條件');
			showNewMessage('密碼太弱了呱！');
			setShowDucktalk(true);
			return;
		}

		if (registerData.password !== registerData.retype_password) {
			setRegisterError('兩次輸入的密碼不相符');
			showNewMessage('居然馬上就打錯了呱！');
			setShowDucktalk(true);
			return;
		}

		if (!registerData.email.trim()) {
			setRegisterError('請輸入信箱');
			showNewMessage('沒有信箱怎麼收我的情書呱！');
			setShowDucktalk(true);
			return;
		}

		if (!registerData.terms) {
			setRegisterError('請同意使用條款');
			showNewMessage('請記得勾選使用條款呱！');
			setShowDucktalk(true);
			return;
		}

		try {
			// 創建一個新的物件，不包含 retype_password 和 terms
			const submitData = {
				name: registerData.name,
				account: registerData.account,
				password: registerData.password,
				email: registerData.email,
				phone: registerData.phone,
				birthday: registerData.birthday,
			};

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`,
				submitData
			);
			// 除錯訊息
			console.log('API Response:', response.data);

			if (response.data.success) {
				// 註冊成功，顯示成功訊息並返回登入頁
				setRegisterSuccess(true);
				showNewMessage('歡迎加入會員呱！');
				setShowDucktalk(true);
				setTimeout(() => {
					setShowRegister(false);
					setShowDucktalk(false);
					setRegisterSuccess(false);
					// 清空註冊表單
					setRegisterData({
						name: '',
						account: '',
						password: '',
						retype_password: '',
						email: '',
						phone: '',
						birthday: '',
						terms: false,
					});
				}, 1500);
			} else {
				// 加入對非成功狀態的處理
				setRegisterError(response.data.message || '註冊處理失敗');
				setDuckMessage(response.data.message || '註冊處理失敗呱！');
				setShowDucktalk(true);
			}
		} catch (error) {
			console.error('Registration error:', error);
			console.error('Error response:', error.response);

			const errorMsg = error.response?.data?.message || '註冊失敗，請稍後再試';
			setRegisterError(errorMsg);
			setDuckMessage(errorMsg);
			setShowDucktalk(true);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
				formData
			);
			if (response.data.success) {
				const { token, user } = response.data;
				await login(token, user);

				// 如果勾選了記住我，保存登入信息
				if (rememberMe) {
					localStorage.setItem(
						'rememberedUser',
						JSON.stringify({
							account: formData.account,
							rememberMe: true,
						})
					);
				} else {
					// 如果沒有勾選記住我，清除之前可能保存的信息
					localStorage.removeItem('rememberedUser');
				}

				if (user.role === 'admin') {
					router.push('/admin');
				} else if (user.role === 'shop') {
					router.push(`/admin/Stores/viewStores/${user.id}`);
				} else if (user.role === 'user') {
						router.push(`/user/account/profile`);
				} else {
					router.push('/login');
				}
			}
		} catch (error) {
			const errorMsg = error.response?.data?.message || '登入失敗，請稍後再試';
			setErrorMessage(errorMsg);
			setDuckMessage(errorMsg);
			setShowDucktalk(true);
		}
	};

	const RequiredMark = () => <span className={styles['WGS-required']}>*</span>;

	const handleBack = () => {
		showNewMessage('掰掰～');
		setShowDucktalk(true);
		setTimeout(() => {
			setShowRegister(false);
			setShowDucktalk(false);
			// 在隱藏對話框後，將訊息重置，但不立即顯示
			showNewMessage('歡迎成為Sweety Timer～');
			setShowDucktalk(false);
		}, 1500);
	};

	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const handleQuickFill = (credentials) => {
		setFormData(credentials);
	};

	return (
		<>
			<div className={styles['WGS-loginContainer']}>
				<div className={styles['WGS-back']}>
					<Link href="/">
						<ExpandButton value="返回首頁" />
					</Link>
				</div>
				<div className={styles['WGS-loginBgS']}>SWEETY SWEETY SWEETY</div>
				<div className={styles['WGS-loginBgT']}>TIME TIME TIME TIME</div>

				<div className={styles['WGS-cards-container']}>
					<div
						className={`${styles['WGS-loginCard']} ${
							showRegister ? styles['slide-left'] : ''
						}`}
					>
						<h1 className={styles['WGS-title']}>Sweety time</h1>
						<GoogleLogin />
						<form className={styles['WGS-loginForm']} onSubmit={handleSubmit}>
							<input
								className={styles['WGS-loginInput']}
								type="text"
								name="account"
								value={formData.account}
								onChange={handleInputChange}
								placeholder="user name"
								required
							/>
							<div className={styles['WGS-passwordContainer']}>
								<input
									className={styles['WGS-loginInput']}
									type={showPassword ? 'text' : 'password'}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="password"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className={`
										${styles['WGS-eyeIcon']} ZRT-click-fast`}
								>
									<Image
										src={`vector/icon_${showPassword ? 'eye2' : 'eye'}.svg`}
										alt="toggle password visibility"
										width={20}
										height={20}
									/>
								</button>
							</div>
							<div className={styles['WGS-rememberMe']}>
								<input
									type="checkbox"
									id="remember"
									checked={rememberMe}
									onChange={handleRememberMeChange}
								/>
								<label htmlFor="remember">記住我</label>
							</div>
							<div>
								{errorMessage && (
									<div className={styles['WGS-errorMessage']}>{errorMessage}</div>
								)}
								<button
									className={`${styles['WGS-loginBtn']} ZRT-click-fast`}
									type="submit"
								>
									登 入
								</button>
							</div>
						</form>
						<div className={styles['WGS-bottomLinks']}>
							<button
								onClick={() => {
									setShowRegister(true);
									// 先確保對話框是隱藏的
									setShowDucktalk(false);
									// 使用 setTimeout 來確保狀態變化有序進行
									setTimeout(() => {
										showNewMessage('歡迎成為Sweety Timer～');
										setShowDucktalk(true);
									}, 100);
								}}
								className={styles['WGS-linkBtn']}
							>
								註冊
							</button>
							<a href="login/forget-password">忘記密碼</a>
						</div>
					</div>

					<div
						className={`${styles['WGS-registerinCard']} ${
							showRegister ? styles['slide-in'] : ''
						}`}
					>
						<button className={styles['WGS-backBtn']} onClick={handleBack}>
							返回登入
						</button>
						<h1 className={styles['WGS-title']}>會員註冊</h1>
						<form onSubmit={handleRegisterSubmit}>
							<input
								className={styles['WGS-register-input']}
								placeholder="name | 姓名 (必填)"
								name="name"
								value={registerData.name}
								onChange={handleRegisterInputChange}
								// required
							/>
							<input
								className={styles['WGS-register-input']}
								placeholder="account | 帳號(必填)"
								name="account"
								value={registerData.account}
								onChange={handleRegisterInputChange}
							/>
							<input
								className={styles['WGS-register-input']}
								placeholder="password | 密碼(必填)"
								type="password"
								name="password"
								value={registerData.password}
								onChange={handleRegisterInputChange}
							/>
							<PasswordValidation
								password={registerData.password}
								onValidationChange={(isValid) => setIsPasswordValid(isValid)}
							/>
							<input
								className={styles['WGS-register-input']}
								placeholder="retype password | 重新輸入密碼(必填)"
								type="password"
								name="retype_password"
								value={registerData.retype_password}
								onChange={handleRegisterInputChange}
							/>
							<input
								className={styles['WGS-register-input']}
								placeholder="e-mail | 電子信箱(必填)"
								type="email"
								name="email"
								value={registerData.email}
								onChange={handleRegisterInputChange}
								// required
							/>
							<input
								className={styles['WGS-register-input']}
								placeholder="phone | 電話"
								name="phone"
								value={registerData.phone}
								onChange={handleRegisterInputChange}
							/>
							<input
								className={styles['WGS-register-date']}
								type="date"
								placeholder="birthday | 生日"
								name="birthday"
								value={registerData.birthday}
								onChange={handleRegisterInputChange}
							/>
							<div className={styles['WGS-checkbox-container']}>
								<input
									type="checkbox"
									id="terms"
									name="terms"
									checked={registerData.terms}
									onChange={handleRegisterInputChange}
									className={styles['WGS-checkbox']}
								/>
								<label htmlFor="terms">
									請查看<span className={styles['WGS-terms']}>使用條款</span>
									以保障個人權益
								</label>
							</div>
							{registerError && (
								<div className={styles['WGS-errorMessage']}>{registerError}</div>
							)}
							<button type="submit" className={styles['WGS-submit-button']}>
								申請成為會員
							</button>
						</form>
					</div>
				</div>

				<div
					className={`${styles['WGS-loginDuck']} ${
						showRegister ? styles['duck-show'] : ''
					} ${showDucktalk ? styles['duck-goodbye'] : ''}`}
				>
					<div
						className={`${styles['WGS-duckTalk']} ${
							isAnimating ? styles['show-message'] : ''
						}`}
					>
						<Image
							src="vector/duck_talk.svg"
							alt="duck_talk"
							width={230}
							height={180}
						/>
						<div className={styles['WGS-talkText']}>{duckMessage}</div>
					</div>
					<Image src="vector/duck.svg" alt="duck" width={230} height={180} />
				</div>
				<div
					className={`${styles['WGS-quickLoginContainer']} ${
						showRegister ? styles['quickLogin-hide'] : ''
					}`}
				>
					<div className="text-dark fw-bold">
						測試用
						<div className="d-flex justify-content-center mt-1">
							<QuickLogin onFill={handleQuickFill} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
