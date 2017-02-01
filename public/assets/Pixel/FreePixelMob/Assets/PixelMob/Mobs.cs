using System.Collections;
using UnityEngine;
[RequireComponent(typeof(CanvasGroup))]
public class Mobs : MonoBehaviour
{
	static int AnimatorWalk = Animator.StringToHash("Walk");
	static int AnimatorAttack = Animator.StringToHash("Attack");
	Animator _animator;
	void Awake()
	{
		_animator = GetComponentInChildren<Animator>();
	}
	void Start()
	{
		StartCoroutine(Animate());
	}
	IEnumerator Animate()
	{
		yield return new WaitForSeconds(5f);

		_animator.SetBool(AnimatorWalk, true);
		yield return new WaitForSeconds(1f);

		_animator.transform.localScale = new Vector3(-1, 1, 1);
		yield return new WaitForSeconds(1f);

		_animator.SetBool(AnimatorWalk, false);
		yield return new WaitForSeconds(1f);

		_animator.SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(1f);

		_animator.SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(1f);

		_animator.SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(5f);
	}
}
