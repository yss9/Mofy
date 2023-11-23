// index.js

import React, { useState } from 'react';
import {
 InputImg, ImgInput
} from '../../styles/testStyle';

export default function BoardNewPage() {


// 업로드 된 이미지 미리보기

 return (
     <>
      <label>
       <InputImg src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.namu.wiki%2Fi%2F-uIrg-XGR8jl44xEPSd3W7ICl_niyYvpKcnupgPu44OjVP4dP7sQRez_7yAMRoOU4tpr2uQHS-HCOyPOJUH7wQ.webp&tbnid=1CCZfThZuaTNoM&vet=12ahUKEwiC_qDJwtmCAxVIc_UHHX23AoIQMygAegQIARAw..i&imgrefurl=https%3A%2F%2Fnamu.wiki%2Fw%2FSecure%2520Digital&docid=8XNqe7IVTkdmWM&w=580&h=716&q=sd&hl=ko&ved=2ahUKEwiC_qDJwtmCAxVIc_UHHX23AoIQMygAegQIARAw"/>
       <ImgInput type="file" accept="image/*"/>
      </label>
     </>
 );
}
