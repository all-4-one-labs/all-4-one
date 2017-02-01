using System;
using UnityEngine;
using UnityEngine.UI;
[ExecuteInEditMode]
[RequireComponent(typeof(Image))]
[RequireComponent(typeof(Animator))]
public class Mob : MonoBehaviour
{
	public string Skin = "A";
	Sprite[] _sprites;
	Image _image;
	Animator _animator;
	string _path;
	void Awake()
	{
		_image = GetComponent<Image>();
		_animator = GetComponent<Animator>();
		Load();
	}
	void Load()
	{
		var path = "Mob/" + _animator.runtimeAnimatorController.name + Skin;
		if (!path.Equals(_path))
		{
			_path = path;
			_sprites = Resources.LoadAll<Sprite>(_path);
		}
	}
	void LateUpdate()
	{
		if (_image == null || _image.sprite == null)
			return;
		Load();
		var name = _image.sprite.name;
		var sprite = Array.Find(_sprites, item => item.name == name);
		if (sprite)
			_image.sprite = sprite;
	}
}
