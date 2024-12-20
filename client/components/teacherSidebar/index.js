import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Button,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import styles from './teacher-sidebar.module.scss';

const TeacherSidebar = ({ fetchTeachers }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);

  // 修改搜索處理函數，同時考慮關鍵字和類別
  const handleSearch = () => {
    const searchParams = {
      keyword: keyword,
      category: category,
      status: status
    };
    fetchTeachers(searchParams);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 修改清除搜索函數
  const clearSearch = () => {
    setKeyword('');
    setCategory('');
    setStatus('');
    fetchTeachers({});
  };

  // 修改類別變更處理函數
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    
    // 使用當前的關鍵字和新選擇的類別進行搜索
    const searchParams = {
      keyword: keyword,
      category: selectedCategory,
      status: status
    };
    fetchTeachers(searchParams);
  };

  return (
    <div className={`${styles.sidebar} ${open ? '' : styles.sidebarClosed}`}>
      <h3 className={`${styles.sideBarTitle} mb-5 fw-bolder`}>搜尋你有興趣的老師專長</h3>

      <div
        className={`${styles.searchBar} position-relative`}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        <TextField
          variant="outlined"
          placeholder="輸入關鍵字..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <>
                {keyword && (
                  <IconButton
                    className={`${styles.clearBtn} position-absolute`}
                    style={{ top: '5px', right: '50px' }}
                    onClick={clearSearch}
                  >
                    <TiDelete size={25} />
                  </IconButton>
                )}
                <IconButton onClick={handleSearch}>
                  <FaSearch />
                </IconButton>
              </>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: '30px',
            '& .MuiOutlinedInput-root': {
              paddingRight: '8px',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            width: '100%',
            height: '48px',
            marginBottom: '20px',
          }}
        />
      </div>

      <div style={{ width: '100%', marginBottom: '23px' }}>
        <FormControl
          variant="outlined"
          sx={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '30px',
            '& .MuiSelect-select': {
              paddingTop: '12px',
              paddingBottom: '12px',
            },
          }}
        >
          <InputLabel>選擇類別</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="選擇類別"
            sx={{
              borderRadius: '25px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              width: '100%',
              height: '48px',
            }}
          >
            <MenuItem value="">全部</MenuItem>
            <MenuItem value="日式甜點">日式甜點</MenuItem>
            <MenuItem value="法式甜點">法式甜點</MenuItem>
            <MenuItem value="蛋糕甜點">蛋糕甜點</MenuItem>
            <MenuItem value="烘焙麵包">烘焙麵包</MenuItem>
            <MenuItem value="造型饅頭">造型饅頭</MenuItem>
            <MenuItem value="中式麵點">中式麵點</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        onClick={clearSearch}
        variant="outlined"
        color="white"
        sx={{
          marginTop: '20px',
          width: '100%',
        }}
      >
        重置篩選
      </Button>

      <div className={styles.sidebarToggle} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default TeacherSidebar;