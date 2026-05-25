import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/Icons'
import { usePage } from '../context/PageContext'
import {
  maskPhoneDisplay,
  useAddress,
  type Address,
  type AddressTag,
} from '../context/AddressContext'

const tags: AddressTag[] = ['家', '公司', '学校']

export function Addresses() {
  const { goBack, navigate } = usePage()
  const { addresses, selectedId, selectAddress, addAddress, updateAddress, removeAddress, setDefault } =
    useAddress()

  const [editing, setEditing] = useState<Address | null>(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    tag: '家' as AddressTag,
    detail: '',
    isDefault: false,
  })
  const [showForm, setShowForm] = useState(false)

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', phone: '', tag: '家', detail: '', isDefault: addresses.length === 0 })
    setShowForm(true)
  }

  const handleSelect = (id: string) => {
    selectAddress(id)
    goBack()
  }

  const handleSave = () => {
    if (!form.name.trim() || !/^1\d{10}$/.test(form.phone) || !form.detail.trim()) return
    if (editing) {
      updateAddress(editing.id, {
        name: form.name.trim(),
        phone: form.phone,
        tag: form.tag,
        detail: form.detail.trim(),
        isDefault: form.isDefault,
      })
    } else {
      addAddress({
        name: form.name.trim(),
        phone: form.phone,
        tag: form.tag,
        detail: form.detail.trim(),
        isDefault: form.isDefault,
      })
    }
    setShowForm(false)
  }

  return (
    <div className="page">
      <div className="page-scroll has-footer">
        <StatusBar />
        <nav className="nav-bar">
          <button type="button" className="nav-back" onClick={goBack} aria-label="返回">
            <IconBack />
          </button>
          <h1>收货地址管理</h1>
        </nav>

        <ul className="address-list">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className={`card address-item${selectedId === addr.id ? ' selected' : ''}`}
            >
              <button
                type="button"
                className="address-item-main"
                onClick={() => handleSelect(addr.id)}
              >
                <div className="address-item-top">
                  <strong>{addr.name}</strong>
                  <span>{maskPhoneDisplay(addr.phone)}</span>
                  <span className="addr-tag">{addr.tag}</span>
                  {addr.isDefault && <span className="default-badge">默认</span>}
                </div>
                <p>{addr.detail}</p>
                {selectedId === addr.id && (
                  <span className="selected-mark">✓ 当前使用</span>
                )}
              </button>
              <div className="address-item-actions">
                {!addr.isDefault && (
                  <button type="button" onClick={() => setDefault(addr.id)}>
                    设为默认
                  </button>
                )}
                <button type="button" className="danger" onClick={() => removeAddress(addr.id)}>
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showForm && (
          <div className="card address-form">
            <h3>{editing ? '编辑地址' : '新增地址'}</h3>
            <label>
              联系人
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="姓名"
              />
            </label>
            <label>
              手机号
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="11位手机号"
                maxLength={11}
              />
            </label>
            <label>
              标签
              <div className="pill-group">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`pill${form.tag === t ? ' active' : ''}`}
                    onClick={() => setForm({ ...form, tag: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </label>
            <label>
              详细地址
              <textarea
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                placeholder="街道、门牌号、楼层"
                rows={3}
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              />
              设为默认地址
            </label>
            <div className="form-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                取消
              </button>
              <button type="button" className="btn-primary" onClick={handleSave}>
                保存
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="sticky-footer address-footer">
        <button type="button" className="btn-primary block" onClick={openAdd}>
          + 新增收货地址
        </button>
      </footer>
    </div>
  )
}