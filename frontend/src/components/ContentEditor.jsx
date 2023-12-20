/* eslint-disable react/prop-types */

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './../App.css'
import {FaBold, FaItalic, FaStrikethrough, FaUndo, FaRedo, FaCode} from 'react-icons/fa'
import { LuHeading1,LuHeading2,LuHeading3,LuHeading4,LuHeading5,LuHeading6 } from "react-icons/lu";
import { MdFormatListBulleted, MdFormatQuote,MdHorizontalRule } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { GoCodeSquare } from "react-icons/go";
import './../App.css'






const MenuBar = ({editor}) => {

  if (!editor) {
    return null
  }
  

  return (
    <div className='absolute z-10 flex flex-wrap gap-2 mt-5 rounded-md right-2 left-2 flex-wrajustify-center bg-slate-300 w-fit'>
      <button
         onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`py-2 p-1 mx-1 hover:bg-slate-400 ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        <FaBold />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={(e) =>  {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={(e) =>  {
          e.preventDefault();
          editor.chain().focus().toggleCode().run()
        }}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        <FaCode />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run()}}
            className={`mx-1 p-1 text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        <LuHeading1 />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run()}}
            className={`mx-1 p-1 text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        <LuHeading2 />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run()}}
            className={`mx-1 p-1 text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
      >
        <LuHeading3 />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run()}}
            className={`mx-1 p-1 text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
      >
        <LuHeading4 />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run()}}
            className={`mx-1 p-1 text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
      >
        <LuHeading5 />
      </button>
      <button
        onClick={
          (e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run()}}
        className={`mx-1 p-1  text-lg hover:bg-slate-400 ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
      >
        <LuHeading6 />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run()}}
          className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('bulletlist') ? 'is-active' : ''}`}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run()}}
          className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('orderedlist') ? 'is-active' : ''}`}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run()}}
          className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('codeblock') ? 'is-active' : ''}`}
      >
        <GoCodeSquare />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run()}}
          className={`mx-1 p-1 hover:bg-slate-400 ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        <MdFormatQuote />
      </button>
      <button onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().setHorizontalRule().run()}}
        className={`p-1 mx-1 hover:bg-slate-400 ${editor.isActive('rule') ? 'is-active' : ''}`}
        >
        <MdHorizontalRule />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run()}}
          className={`p-1 mx-1 cursor-pointer hover:bg-slate-400 ${editor.isActive('undo') ? 'is-active' : ''}`}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <FaUndo />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run()}}
          className={`py-2 p-1 mx-1 cursor-pointer hover:bg-slate-400 ${editor.isActive('redo') ? 'is-active' : ''}`}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <FaRedo />
      </button>
    </div>
  )
}


const ContentEditor = ({content,setContent}) => {
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate({editor}) {
      setContent(String(editor.getHTML()))
    }
  });

  return (
    <>
      <MenuBar editor = {editor}/>
      <EditorContent  editor = {editor} />
    </>
  )
}

export default ContentEditor