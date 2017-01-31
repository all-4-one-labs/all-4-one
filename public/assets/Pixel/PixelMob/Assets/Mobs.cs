using ca.HenrySoftware.Deko;
using System.Collections;
using UnityEngine;
[RequireComponent(typeof(CanvasGroup))]
public class Mobs : MonoBehaviour
{
	static int AnimatorWalk = Animator.StringToHash("Walk");
	static int AnimatorAttack = Animator.StringToHash("Attack");
	public Animator[] Controllers;
	public CanvasGroup GroupText;
	CanvasGroup _groupMob;
	void Awake()
	{
		_groupMob = GetComponent<CanvasGroup>();
	}
	void Start()
	{
		_groupMob.alpha = 0f;
		GroupText.alpha = 0f;
		Begin();
	}
	void Begin()
	{
		Ease.GoAlpha(this, 0f, 1f, 1f, null, null, EaseType.Linear);
		Ease.Go(this, 0f, 1f, 1f, (p) => GroupText.alpha = p, Continue0, EaseType.Linear);
	}
	void Continue0()
	{
		Ease.Go(this, 1f, 0f, 1f, (p) => GroupText.alpha = p, Continue1, EaseType.Linear);
	}
	void Continue1()
	{
		StartCoroutine(Animate());
	}
	IEnumerator Animate()
	{
		yield return new WaitForSeconds(5f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].SetBool(AnimatorWalk, true);
		yield return new WaitForSeconds(1f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].transform.localScale = new Vector3(-1, 1, 1);
		yield return new WaitForSeconds(1f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].SetBool(AnimatorWalk, false);
		yield return new WaitForSeconds(1f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(1f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(1f);

		for (var i = 0; i < Controllers.Length; i++)
			Controllers[i].SetTrigger(AnimatorAttack);
		yield return new WaitForSeconds(5f);

		Ease.Go(this, 0f, 1f, 1f, (p) => GroupText.alpha = p, Finish, EaseType.Linear);
	}
	void Finish()
	{
		StopAllCoroutines();
		Ease.GoAlpha(this, 1f, 0f, 1f, null, null, EaseType.Linear);
		Ease.Go(this, 1f, 0f, 1f, (p) => GroupText.alpha = p, Begin, EaseType.Linear);
	}
}
