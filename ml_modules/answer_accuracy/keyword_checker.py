def keyword_coverage_score(user_answer, keywords):
    user_answer = user_answer.lower()
    match_count = 0

    for keyword in keywords:
        if keyword.lower() in user_answer:
            match_count += 1

    score = match_count / len(keywords)
    return {
        "matched_keywords": match_count,
        "total_keywords": len(keywords),
        "coverage_score": round(score, 2)
    }